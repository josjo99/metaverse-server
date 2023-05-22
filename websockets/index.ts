import http from 'http';
import { Server } from 'socket.io';
import Guest from './interface/guest.interface';
import CheckInPayload from './interface/checkInPayload.interface';
import AvatarTransform from './interface/avatarTransform.interface';
import Token from './interface/token.interface';
import GuestMetadata from './interface/guestMetadata.interface';
import AssetTransform from './interface/assetTransform.interface';
import { SocketEvents } from '../helpers/constants';
import { AgoraConfig } from '../helpers/config';
import { RtcTokenBuilder, RtcRole } from 'agora-access-token';
import { instrument } from '@socket.io/admin-ui'
import Asset from './interface/asset.interface';
import redisService from '../redisService';

const parseData = (payload: string) => {
    return JSON.parse(payload);
}

const stringifyData = (payload: any) => {
    return JSON.stringify(payload);
}

export default function SocketServer(httpServer: http.Server) {
    const socketIO = new Server( 
        httpServer, {
            cors:{
                origin: '*',
                credentials: true,
            },
            path:"/metaverse",
        }
    );

    socketIO.sockets.on("connection", (socket) => {
        socket.on(SocketEvents.checkIn, async (payload: string) => {
            try {
                const checkInData: CheckInPayload = parseData(payload);
                let data: Guest = {
                    displayName: checkInData.displayName,
                    roomId: checkInData.roomId,
                    uid: socket.id,
                    vr: checkInData.vr,
                    position_x: 0,
                    position_y: 1.75,
                    position_z: 0,
                    rotation_x: 0,
                    rotation_y: 0,
                    rotation_z: 0,
                    hand_left_position_x: 0,
                    hand_left_position_y: 0,
                    hand_left_position_z: 0,
                    hand_left_rotation_x: 0,
                    hand_left_rotation_y: 0,
                    hand_left_rotation_z: 0, 
                    hand_right_position_x: 0,
                    hand_right_position_y: 0,
                    hand_right_position_z: 0,
                    hand_right_rotation_x: 0,
                    hand_right_rotation_y: 0,
                    hand_right_rotation_z: 0,
                    hand_left_finger_thumb_tip_position_x: 0,
                    hand_left_finger_thumb_tip_position_y: 0,
                    hand_left_finger_thumb_tip_position_z: 0,
                    hand_left_finger_thumb_tip_rotation_x: 0,
                    hand_left_finger_thumb_tip_rotation_y: 0,
                    hand_left_finger_thumb_tip_rotation_z: 0,
                    hand_left_finger_thumb_middle_position_x: 0,
                    hand_left_finger_thumb_middle_position_y: 0,
                    hand_left_finger_thumb_middle_position_z: 0,
                    hand_left_finger_thumb_middle_rotation_x: 0,
                    hand_left_finger_thumb_middle_rotation_y: 0,
                    hand_left_finger_thumb_middle_rotation_z: 0,
                    hand_left_finger_thumb_root_position_x: 0,
                    hand_left_finger_thumb_root_position_y: 0,
                    hand_left_finger_thumb_root_position_z: 0,
                    hand_left_finger_thumb_root_rotation_x: 0,
                    hand_left_finger_thumb_root_rotation_y: 0,
                    hand_left_finger_thumb_root_rotation_z: 0,
                    hand_left_finger_index_tip_position_x: 0,
                    hand_left_finger_index_tip_position_y: 0,
                    hand_left_finger_index_tip_position_z: 0,
                    hand_left_finger_index_tip_rotation_x: 0,
                    hand_left_finger_index_tip_rotation_y: 0,
                    hand_left_finger_index_tip_rotation_z: 0,
                    hand_left_finger_index_middle_position_x: 0,
                    hand_left_finger_index_middle_position_y: 0,
                    hand_left_finger_index_middle_position_z: 0,
                    hand_left_finger_index_middle_rotation_x: 0,
                    hand_left_finger_index_middle_rotation_y: 0,
                    hand_left_finger_index_middle_rotation_z: 0,
                    hand_left_finger_index_root_position_x: 0,
                    hand_left_finger_index_root_position_y: 0,
                    hand_left_finger_index_root_position_z: 0,
                    hand_left_finger_index_root_rotation_x: 0,
                    hand_left_finger_index_root_rotation_y: 0,
                    hand_left_finger_index_root_rotation_z: 0,
                    hand_left_finger_middle_tip_position_x: 0,
                    hand_left_finger_middle_tip_position_y: 0,
                    hand_left_finger_middle_tip_position_z: 0,
                    hand_left_finger_middle_tip_rotation_x: 0,
                    hand_left_finger_middle_tip_rotation_y: 0,
                    hand_left_finger_middle_tip_rotation_z: 0,
                    hand_left_finger_middle_middle_position_x: 0,
                    hand_left_finger_middle_middle_position_y: 0,
                    hand_left_finger_middle_middle_position_z: 0,
                    hand_left_finger_middle_middle_rotation_x: 0,
                    hand_left_finger_middle_middle_rotation_y: 0,
                    hand_left_finger_middle_middle_rotation_z: 0,
                    hand_left_finger_middle_root_position_x: 0,
                    hand_left_finger_middle_root_position_y: 0,
                    hand_left_finger_middle_root_position_z: 0,
                    hand_left_finger_middle_root_rotation_x: 0,
                    hand_left_finger_middle_root_rotation_y: 0,
                    hand_left_finger_middle_root_rotation_z: 0,
                    hand_left_finger_ring_tip_position_x: 0,
                    hand_left_finger_ring_tip_position_y: 0,
                    hand_left_finger_ring_tip_position_z: 0,
                    hand_left_finger_ring_tip_rotation_x: 0,
                    hand_left_finger_ring_tip_rotation_y: 0,
                    hand_left_finger_ring_tip_rotation_z: 0,
                    hand_left_finger_ring_middle_position_x: 0,
                    hand_left_finger_ring_middle_position_y: 0,
                    hand_left_finger_ring_middle_position_z: 0,
                    hand_left_finger_ring_middle_rotation_x: 0,
                    hand_left_finger_ring_middle_rotation_y: 0,
                    hand_left_finger_ring_middle_rotation_z: 0,
                    hand_left_finger_ring_root_position_x: 0,
                    hand_left_finger_ring_root_position_y: 0,
                    hand_left_finger_ring_root_position_z: 0,
                    hand_left_finger_ring_root_rotation_x: 0,
                    hand_left_finger_ring_root_rotation_y: 0,
                    hand_left_finger_ring_root_rotation_z: 0,
                    hand_left_finger_pinky_tip_position_x: 0,
                    hand_left_finger_pinky_tip_position_y: 0,
                    hand_left_finger_pinky_tip_position_z: 0,
                    hand_left_finger_pinky_tip_rotation_x: 0,
                    hand_left_finger_pinky_tip_rotation_y: 0,
                    hand_left_finger_pinky_tip_rotation_z: 0,
                    hand_left_finger_pinky_middle_position_x: 0,
                    hand_left_finger_pinky_middle_position_y: 0,
                    hand_left_finger_pinky_middle_position_z: 0,
                    hand_left_finger_pinky_middle_rotation_x: 0,
                    hand_left_finger_pinky_middle_rotation_y: 0,
                    hand_left_finger_pinky_middle_rotation_z: 0,
                    hand_left_finger_pinky_root_position_x: 0,
                    hand_left_finger_pinky_root_position_y: 0,
                    hand_left_finger_pinky_root_position_z: 0,
                    hand_left_finger_pinky_root_rotation_x: 0,
                    hand_left_finger_pinky_root_rotation_y: 0,
                    hand_left_finger_pinky_root_rotation_z: 0,
                    hand_right_finger_thumb_tip_position_x: 0,
                    hand_right_finger_thumb_tip_position_y: 0,
                    hand_right_finger_thumb_tip_position_z: 0,
                    hand_right_finger_thumb_tip_rotation_x: 0,
                    hand_right_finger_thumb_tip_rotation_y: 0,
                    hand_right_finger_thumb_tip_rotation_z: 0,
                    hand_right_finger_thumb_middle_position_x: 0,
                    hand_right_finger_thumb_middle_position_y: 0,
                    hand_right_finger_thumb_middle_position_z: 0,
                    hand_right_finger_thumb_middle_rotation_x: 0,
                    hand_right_finger_thumb_middle_rotation_y: 0,
                    hand_right_finger_thumb_middle_rotation_z: 0,
                    hand_right_finger_thumb_root_position_x: 0,
                    hand_right_finger_thumb_root_position_y: 0,
                    hand_right_finger_thumb_root_position_z: 0,
                    hand_right_finger_thumb_root_rotation_x: 0,
                    hand_right_finger_thumb_root_rotation_y: 0,
                    hand_right_finger_thumb_root_rotation_z: 0,
                    hand_right_finger_index_tip_position_x: 0,
                    hand_right_finger_index_tip_position_y: 0,
                    hand_right_finger_index_tip_position_z: 0,
                    hand_right_finger_index_tip_rotation_x: 0,
                    hand_right_finger_index_tip_rotation_y: 0,
                    hand_right_finger_index_tip_rotation_z: 0,
                    hand_right_finger_index_middle_position_x: 0,
                    hand_right_finger_index_middle_position_y: 0,
                    hand_right_finger_index_middle_position_z: 0,
                    hand_right_finger_index_middle_rotation_x: 0,
                    hand_right_finger_index_middle_rotation_y: 0,
                    hand_right_finger_index_middle_rotation_z: 0,
                    hand_right_finger_index_root_position_x: 0,
                    hand_right_finger_index_root_position_y: 0,
                    hand_right_finger_index_root_position_z: 0,
                    hand_right_finger_index_root_rotation_x: 0,
                    hand_right_finger_index_root_rotation_y: 0,
                    hand_right_finger_index_root_rotation_z: 0,
                    hand_right_finger_middle_tip_position_x: 0,
                    hand_right_finger_middle_tip_position_y: 0,
                    hand_right_finger_middle_tip_position_z: 0,
                    hand_right_finger_middle_tip_rotation_x: 0,
                    hand_right_finger_middle_tip_rotation_y: 0,
                    hand_right_finger_middle_tip_rotation_z: 0,
                    hand_right_finger_middle_middle_position_x: 0,
                    hand_right_finger_middle_middle_position_y: 0,
                    hand_right_finger_middle_middle_position_z: 0,
                    hand_right_finger_middle_middle_rotation_x: 0,
                    hand_right_finger_middle_middle_rotation_y: 0,
                    hand_right_finger_middle_middle_rotation_z: 0,
                    hand_right_finger_middle_root_position_x: 0,
                    hand_right_finger_middle_root_position_y: 0,
                    hand_right_finger_middle_root_position_z: 0,
                    hand_right_finger_middle_root_rotation_x: 0,
                    hand_right_finger_middle_root_rotation_y: 0,
                    hand_right_finger_middle_root_rotation_z: 0,
                    hand_right_finger_ring_tip_position_x: 0,
                    hand_right_finger_ring_tip_position_y: 0,
                    hand_right_finger_ring_tip_position_z: 0,
                    hand_right_finger_ring_tip_rotation_x: 0,
                    hand_right_finger_ring_tip_rotation_y: 0,
                    hand_right_finger_ring_tip_rotation_z: 0,
                    hand_right_finger_ring_middle_position_x: 0,
                    hand_right_finger_ring_middle_position_y: 0,
                    hand_right_finger_ring_middle_position_z: 0,
                    hand_right_finger_ring_middle_rotation_x: 0,
                    hand_right_finger_ring_middle_rotation_y: 0,
                    hand_right_finger_ring_middle_rotation_z: 0,
                    hand_right_finger_ring_root_position_x: 0,
                    hand_right_finger_ring_root_position_y: 0,
                    hand_right_finger_ring_root_position_z: 0,
                    hand_right_finger_ring_root_rotation_x: 0,
                    hand_right_finger_ring_root_rotation_y: 0,
                    hand_right_finger_ring_root_rotation_z: 0,
                    hand_right_finger_pinky_tip_position_x: 0,
                    hand_right_finger_pinky_tip_position_y: 0,
                    hand_right_finger_pinky_tip_position_z: 0,
                    hand_right_finger_pinky_tip_rotation_x: 0,
                    hand_right_finger_pinky_tip_rotation_y: 0,
                    hand_right_finger_pinky_tip_rotation_z: 0,
                    hand_right_finger_pinky_middle_position_x: 0,
                    hand_right_finger_pinky_middle_position_y: 0,
                    hand_right_finger_pinky_middle_position_z: 0,
                    hand_right_finger_pinky_middle_rotation_x: 0,
                    hand_right_finger_pinky_middle_rotation_y: 0,
                    hand_right_finger_pinky_middle_rotation_z: 0,
                    hand_right_finger_pinky_root_position_x: 0,
                    hand_right_finger_pinky_root_position_y: 0,
                    hand_right_finger_pinky_root_position_z: 0,
                    hand_right_finger_pinky_root_rotation_x: 0,
                    hand_right_finger_pinky_root_rotation_y: 0,
                    hand_right_finger_pinky_root_rotation_z: 0,
                };
                if(checkInData.avatar !== undefined){
                    data.avatar = checkInData.avatar;
                }
                socket.join(checkInData.roomId);
                await redisService.addUser(data);
                const roomGuests = await redisService.getGuestList(checkInData.roomId, data.uid);
                socket.emit(SocketEvents.guestList, stringifyData(roomGuests));
                socket.to(data.roomId).emit(SocketEvents.checkIn, stringifyData(data));
            } catch (err) {
                console.log("SERVER :", err);
            }
        });

        socket.on(SocketEvents.avatarTransform, async (payload: string) => {
            try {
                const transformData: AvatarTransform = parseData(payload);
                if(transformData !== undefined){
                    transformData.uid = socket.id;
                    const roomId = await redisService.modifyGuest(transformData);
                    if(roomId !== undefined){
                        socket.to(roomId).emit(SocketEvents.avatarTransform, stringifyData(transformData));
                    }
                }
            } catch (err) {
                console.log("SERVER :", err);
            }
        });

        socket.on(SocketEvents.profileUpdate, async (payload: string) => {
            try{
                const profileUpdate: GuestMetadata = parseData(payload);
                const profileUpdateGuest = await redisService.updateProfile(socket.id, profileUpdate);
                if(profileUpdateGuest !== undefined){
                    socket.to(profileUpdateGuest.roomId).emit(SocketEvents.profileUpdate, stringifyData(profileUpdateGuest));
                }
            } catch (err) {
                console.log("SERVER :", err);
            }
        });

        socket.on(SocketEvents.assetAdd, async (payload: string) => {
            try{
                const data = parseData(payload);
                socket.to(data.roomId).emit(SocketEvents.assetAdd, stringifyData(data.productData));
            } catch (err) {
                console.log("SERVER :", err);
            }
        });

        socket.on(SocketEvents.assetModelUpdate, async (payload: string) => {
            try{
                const data = parseData(payload);
                socket.to(data.roomId).emit(SocketEvents.assetModelUpdate, stringifyData(data.productData));
            } catch (err) {
                console.log("SERVER :", err);
            }
        });

        socket.on(SocketEvents.assetUpdate, async (payload: string) => {
            try{
                const assetData: AssetTransform = parseData(payload);
                const asset: Asset = await redisService.modifyAsset(assetData);
                socket.to(assetData.roomId).emit(SocketEvents.assetUpdate, stringifyData(asset));
            } catch(err) {
                console.log("SERVER :", err);
            }
        });

        socket.on(SocketEvents.assetDelete, async (payload: string) => {
            try{
                const data = parseData(payload);
                socket.to(data.roomId).emit(SocketEvents.assetDelete, stringifyData(data.productData));
            } catch (err) {
                console.log("SERVER :", err);
            }
        });
        
        socket.on(SocketEvents.assetTransform, async (payload: string)=>{
            try{
                const assetData: AssetTransform = parseData(payload);
                const asset: Asset = await redisService.modifyAsset(assetData);
                socket.to(assetData.roomId).emit(SocketEvents.assetTransform, stringifyData(asset));
            } catch(err) {
                console.log("SERVER :", err);
            } 
        });

        socket.on(SocketEvents.token, async () => {
            try {
                const guest = await redisService.getGuest(socket.id);
                if(guest !== undefined){
                    const tokenGenerationTime = Math.floor( Date.now() / 1000 );
                    const token = RtcTokenBuilder.buildTokenWithAccount(process.env.AGORA_APPID, process.env.AGORA_APP_CERTIFICATE , guest.roomId , socket.id, RtcRole.PUBLISHER, tokenGenerationTime + AgoraConfig.expiryTime);
                    const tokenData: Token = { appId: process.env.AGORA_APPID, token : token };
                    socket.emit(SocketEvents.token, stringifyData(tokenData));
                }
            } catch (err) {
                console.log("SERVER :", err);
            }
        });

        socket.on(SocketEvents.genericEvent, async (payload: string) => {
            try {
                const guest = await redisService.getGuest(socket.id);
                socket.to(guest.roomId).emit(SocketEvents.genericEvent, payload);
            } catch (err) {
                console.log("SERVER :", err);
            }
        });
        
        socket.on(SocketEvents.disconnect, async () => {
            try {
                const guest: Guest|undefined = await redisService.removeGuest(socket.id);
                if(guest !== undefined){
                    socket.to(guest.roomId).emit(SocketEvents.checkOut, stringifyData(guest));
                }
            } catch(err) {
                console.log("SERVER :", err);
            }
        });
    });

    return socketIO;
}