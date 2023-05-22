// import { createClient, RedisClientType } from 'redis';
import Redis from 'ioredis';
import { config } from 'dotenv-flow';
import AssetTransform from '../websockets/interface/assetTransform.interface';
import AvatarTransform from '../websockets/interface/avatarTransform.interface';
import GuestMetadata from '../websockets/interface/guestMetadata.interface';
import Guest from '../websockets/interface/guest.interface';
import Asset from '../websockets/interface/asset.interface';

config();

class redisService {
    userClient?: Redis | undefined = undefined;
    assetClient?: Redis | undefined = undefined;

    constructor(){
        try{
            this.userClient = new Redis(process.env.REDIS_SERVER + "/0");
            this.assetClient = new Redis(process.env.REDIS_SERVER + "/1");
            this.clearUsersDb();
        } catch (err) {
            console.log("IOREDIS: ", err);
        }
    }

    async clearUsersDb(){
        await this.userClient?.flushdb();
    }

    async addUser(guest: Guest){
        try{
            await this.userClient?.hset(guest.uid, guest);
            await this.userClient?.sadd(guest.roomId, guest.uid);
        } catch (err) {
            console.log("IOREDIS: ", err);
        }
    }

    async updateProfile(uid: string, metadataUpdate: GuestMetadata){
        let guest: Guest | undefined = undefined;
        try {
            if(metadataUpdate !== undefined && uid !== undefined){
                if(metadataUpdate.displayName !== undefined){
                    await this.userClient?.hset(uid, "displayName", metadataUpdate.displayName);
                }
                if(metadataUpdate.avatar !== undefined){
                    await this.userClient?.hset(uid, "avatar", metadataUpdate.avatar);
                }
                const result: any = (await this.userClient?.hgetall(uid));
                if(result !== null){
                    guest = result as Guest;
                }
            }
        } catch (err) {
            console.log("IOREDIS: ", err);
        }
        return guest;
    }

    async modifyGuest(avatarTransform: AvatarTransform){
        let roomId: string| undefined = undefined;
        if(avatarTransform !== undefined){
            try {
                await this.userClient?.hset(avatarTransform.uid, 
                    [
                        "position_x", avatarTransform.position_x, 
                        "position_y", avatarTransform.position_y, 
                        "position_z", avatarTransform.position_z,
                        "rotation_x", avatarTransform.rotation_x,
                        "rotation_y", avatarTransform.rotation_y,
                        "rotation_z", avatarTransform.rotation_z,
                        "hand_left_position_x", avatarTransform.hand_left_position_x, 
                        "hand_left_position_y", avatarTransform.hand_left_position_y, 
                        "hand_left_position_z", avatarTransform.hand_left_position_z,
                        "hand_left_rotation_x", avatarTransform.hand_left_rotation_x,
                        "hand_left_rotation_y", avatarTransform.hand_left_rotation_y,
                        "hand_left_rotation_z", avatarTransform.hand_left_rotation_z,
                        "hand_right_position_x", avatarTransform.hand_right_position_x, 
                        "hand_right_position_y", avatarTransform.hand_right_position_y, 
                        "hand_right_position_z", avatarTransform.hand_right_position_z,
                        "hand_right_rotation_x", avatarTransform.hand_right_rotation_x,
                        "hand_right_rotation_y", avatarTransform.hand_right_rotation_y,
                        "hand_right_rotation_z", avatarTransform.hand_right_rotation_z,
                        "hand_left_finger_thumb_tip_position_x", avatarTransform.hand_left_finger_thumb_tip_position_x,
                        "hand_left_finger_thumb_tip_position_y", avatarTransform.hand_left_finger_thumb_tip_position_y,
                        "hand_left_finger_thumb_tip_position_z", avatarTransform.hand_left_finger_thumb_tip_position_z,
                        "hand_left_finger_thumb_tip_rotation_x", avatarTransform.hand_left_finger_thumb_tip_rotation_x,
                        "hand_left_finger_thumb_tip_rotation_y", avatarTransform.hand_left_finger_thumb_tip_rotation_y,
                        "hand_left_finger_thumb_tip_rotation_z", avatarTransform.hand_left_finger_thumb_tip_rotation_z,
                        "hand_left_finger_thumb_middle_position_x", avatarTransform.hand_left_finger_thumb_middle_position_x,
                        "hand_left_finger_thumb_middle_position_y", avatarTransform.hand_left_finger_thumb_middle_position_y,
                        "hand_left_finger_thumb_middle_position_z", avatarTransform.hand_left_finger_thumb_middle_position_z,
                        "hand_left_finger_thumb_middle_rotation_x", avatarTransform.hand_left_finger_thumb_middle_rotation_x,
                        "hand_left_finger_thumb_middle_rotation_y", avatarTransform.hand_left_finger_thumb_middle_rotation_y,
                        "hand_left_finger_thumb_middle_rotation_z", avatarTransform.hand_left_finger_thumb_middle_rotation_z,
                        "hand_left_finger_thumb_root_position_x", avatarTransform.hand_left_finger_thumb_root_position_x,
                        "hand_left_finger_thumb_root_position_y", avatarTransform.hand_left_finger_thumb_root_position_y,
                        "hand_left_finger_thumb_root_position_z", avatarTransform.hand_left_finger_thumb_root_position_z,
                        "hand_left_finger_thumb_root_rotation_x", avatarTransform.hand_left_finger_thumb_root_rotation_x,
                        "hand_left_finger_thumb_root_rotation_y", avatarTransform.hand_left_finger_thumb_root_rotation_y,
                        "hand_left_finger_thumb_root_rotation_z", avatarTransform.hand_left_finger_thumb_root_rotation_z,
                        "hand_left_finger_index_tip_position_x", avatarTransform.hand_left_finger_index_tip_position_x,
                        "hand_left_finger_index_tip_position_y", avatarTransform.hand_left_finger_index_tip_position_y,
                        "hand_left_finger_index_tip_position_z", avatarTransform.hand_left_finger_index_tip_position_z,
                        "hand_left_finger_index_tip_rotation_x", avatarTransform.hand_left_finger_index_tip_rotation_x,
                        "hand_left_finger_index_tip_rotation_y", avatarTransform.hand_left_finger_index_tip_rotation_y,
                        "hand_left_finger_index_tip_rotation_z", avatarTransform.hand_left_finger_index_tip_rotation_z,
                        "hand_left_finger_index_middle_position_x", avatarTransform.hand_left_finger_index_middle_position_x,
                        "hand_left_finger_index_middle_position_y", avatarTransform.hand_left_finger_index_middle_position_y,
                        "hand_left_finger_index_middle_position_z", avatarTransform.hand_left_finger_index_middle_position_z,
                        "hand_left_finger_index_middle_rotation_x", avatarTransform.hand_left_finger_index_middle_rotation_x,
                        "hand_left_finger_index_middle_rotation_y", avatarTransform.hand_left_finger_index_middle_rotation_y,
                        "hand_left_finger_index_middle_rotation_z", avatarTransform.hand_left_finger_index_middle_rotation_z,
                        "hand_left_finger_index_root_position_x", avatarTransform.hand_left_finger_index_root_position_x,
                        "hand_left_finger_index_root_position_y", avatarTransform.hand_left_finger_index_root_position_y,
                        "hand_left_finger_index_root_position_z", avatarTransform.hand_left_finger_index_root_position_z,
                        "hand_left_finger_index_root_rotation_x", avatarTransform.hand_left_finger_index_root_rotation_x,
                        "hand_left_finger_index_root_rotation_y", avatarTransform.hand_left_finger_index_root_rotation_y,
                        "hand_left_finger_index_root_rotation_z", avatarTransform.hand_left_finger_index_root_rotation_z,
                        "hand_left_finger_middle_tip_position_x", avatarTransform.hand_left_finger_middle_tip_position_x,
                        "hand_left_finger_middle_tip_position_y", avatarTransform.hand_left_finger_middle_tip_position_y,
                        "hand_left_finger_middle_tip_position_z", avatarTransform.hand_left_finger_middle_tip_position_z,
                        "hand_left_finger_middle_tip_rotation_x", avatarTransform.hand_left_finger_middle_tip_rotation_x,
                        "hand_left_finger_middle_tip_rotation_y", avatarTransform.hand_left_finger_middle_tip_rotation_y,
                        "hand_left_finger_middle_tip_rotation_z", avatarTransform.hand_left_finger_middle_tip_rotation_z,
                        "hand_left_finger_middle_middle_position_x", avatarTransform.hand_left_finger_middle_middle_position_x,
                        "hand_left_finger_middle_middle_position_y", avatarTransform.hand_left_finger_middle_middle_position_y,
                        "hand_left_finger_middle_middle_position_z", avatarTransform.hand_left_finger_middle_middle_position_z,
                        "hand_left_finger_middle_middle_rotation_x", avatarTransform.hand_left_finger_middle_middle_rotation_x,
                        "hand_left_finger_middle_middle_rotation_y", avatarTransform.hand_left_finger_middle_middle_rotation_y,
                        "hand_left_finger_middle_middle_rotation_z", avatarTransform.hand_left_finger_middle_middle_rotation_z,
                        "hand_left_finger_middle_root_position_x", avatarTransform.hand_left_finger_middle_root_position_x,
                        "hand_left_finger_middle_root_position_y", avatarTransform.hand_left_finger_middle_root_position_y,
                        "hand_left_finger_middle_root_position_z", avatarTransform.hand_left_finger_middle_root_position_z,
                        "hand_left_finger_middle_root_rotation_x", avatarTransform.hand_left_finger_middle_root_rotation_x,
                        "hand_left_finger_middle_root_rotation_y", avatarTransform.hand_left_finger_middle_root_rotation_y,
                        "hand_left_finger_middle_root_rotation_z", avatarTransform.hand_left_finger_middle_root_rotation_z,
                        "hand_left_finger_ring_tip_position_x", avatarTransform.hand_left_finger_ring_tip_position_x,
                        "hand_left_finger_ring_tip_position_y", avatarTransform.hand_left_finger_ring_tip_position_y,
                        "hand_left_finger_ring_tip_position_z", avatarTransform.hand_left_finger_ring_tip_position_z,
                        "hand_left_finger_ring_tip_rotation_x", avatarTransform.hand_left_finger_ring_tip_rotation_x,
                        "hand_left_finger_ring_tip_rotation_y", avatarTransform.hand_left_finger_ring_tip_rotation_y,
                        "hand_left_finger_ring_tip_rotation_z", avatarTransform.hand_left_finger_ring_tip_rotation_z,
                        "hand_left_finger_ring_middle_position_x", avatarTransform.hand_left_finger_ring_middle_position_x,
                        "hand_left_finger_ring_middle_position_y", avatarTransform.hand_left_finger_ring_middle_position_y,
                        "hand_left_finger_ring_middle_position_z", avatarTransform.hand_left_finger_ring_middle_position_z,
                        "hand_left_finger_ring_middle_rotation_x", avatarTransform.hand_left_finger_ring_middle_rotation_x,
                        "hand_left_finger_ring_middle_rotation_y", avatarTransform.hand_left_finger_ring_middle_rotation_y,
                        "hand_left_finger_ring_middle_rotation_z", avatarTransform.hand_left_finger_ring_middle_rotation_z,
                        "hand_left_finger_ring_root_position_x", avatarTransform.hand_left_finger_ring_root_position_x,
                        "hand_left_finger_ring_root_position_y", avatarTransform.hand_left_finger_ring_root_position_y,
                        "hand_left_finger_ring_root_position_z", avatarTransform.hand_left_finger_ring_root_position_z,
                        "hand_left_finger_ring_root_rotation_x", avatarTransform.hand_left_finger_ring_root_rotation_x,
                        "hand_left_finger_ring_root_rotation_y", avatarTransform.hand_left_finger_ring_root_rotation_y,
                        "hand_left_finger_ring_root_rotation_z", avatarTransform.hand_left_finger_ring_root_rotation_z,
                        "hand_left_finger_pinky_tip_position_x", avatarTransform.hand_left_finger_pinky_tip_position_x,
                        "hand_left_finger_pinky_tip_position_y", avatarTransform.hand_left_finger_pinky_tip_position_y,
                        "hand_left_finger_pinky_tip_position_z", avatarTransform.hand_left_finger_pinky_tip_position_z,
                        "hand_left_finger_pinky_tip_rotation_x", avatarTransform.hand_left_finger_pinky_tip_rotation_x,
                        "hand_left_finger_pinky_tip_rotation_y", avatarTransform.hand_left_finger_pinky_tip_rotation_y,
                        "hand_left_finger_pinky_tip_rotation_z", avatarTransform.hand_left_finger_pinky_tip_rotation_z,
                        "hand_left_finger_pinky_middle_position_x", avatarTransform.hand_left_finger_pinky_middle_position_x,
                        "hand_left_finger_pinky_middle_position_y", avatarTransform.hand_left_finger_pinky_middle_position_y,
                        "hand_left_finger_pinky_middle_position_z", avatarTransform.hand_left_finger_pinky_middle_position_z,
                        "hand_left_finger_pinky_middle_rotation_x", avatarTransform.hand_left_finger_pinky_middle_rotation_x,
                        "hand_left_finger_pinky_middle_rotation_y", avatarTransform.hand_left_finger_pinky_middle_rotation_y,
                        "hand_left_finger_pinky_middle_rotation_z", avatarTransform.hand_left_finger_pinky_middle_rotation_z,
                        "hand_left_finger_pinky_root_position_x", avatarTransform.hand_left_finger_pinky_middle_position_x,
                        "hand_left_finger_pinky_root_position_y", avatarTransform.hand_left_finger_pinky_middle_position_y,
                        "hand_left_finger_pinky_root_position_z", avatarTransform.hand_left_finger_pinky_middle_position_z,
                        "hand_left_finger_pinky_root_rotation_x", avatarTransform.hand_left_finger_pinky_middle_rotation_x,
                        "hand_left_finger_pinky_root_rotation_y", avatarTransform.hand_left_finger_pinky_middle_rotation_y,
                        "hand_left_finger_pinky_root_rotation_z", avatarTransform.hand_left_finger_pinky_middle_rotation_z,
                        "hand_right_finger_thumb_tip_position_x", avatarTransform.hand_left_finger_pinky_middle_position_x,
                        "hand_right_finger_thumb_tip_position_y", avatarTransform.hand_left_finger_pinky_middle_position_y,
                        "hand_right_finger_thumb_tip_position_z", avatarTransform.hand_left_finger_pinky_middle_position_z,
                        "hand_right_finger_thumb_tip_rotation_x", avatarTransform.hand_left_finger_pinky_middle_rotation_x,
                        "hand_right_finger_thumb_tip_rotation_y", avatarTransform.hand_left_finger_pinky_middle_rotation_y,
                        "hand_right_finger_thumb_tip_rotation_z", avatarTransform.hand_left_finger_pinky_middle_rotation_z,
                        "hand_right_finger_thumb_middle_position_x", avatarTransform.hand_right_finger_thumb_middle_position_x,
                        "hand_right_finger_thumb_middle_position_y", avatarTransform.hand_right_finger_thumb_middle_position_y,
                        "hand_right_finger_thumb_middle_position_z", avatarTransform.hand_right_finger_thumb_middle_position_z,
                        "hand_right_finger_thumb_middle_rotation_x", avatarTransform.hand_right_finger_thumb_middle_rotation_x,
                        "hand_right_finger_thumb_middle_rotation_y", avatarTransform.hand_right_finger_thumb_middle_rotation_y,
                        "hand_right_finger_thumb_middle_rotation_z", avatarTransform.hand_right_finger_thumb_middle_rotation_z,
                        "hand_right_finger_thumb_root_position_x", avatarTransform.hand_right_finger_thumb_root_position_x,
                        "hand_right_finger_thumb_root_position_y", avatarTransform.hand_right_finger_thumb_root_position_y,
                        "hand_right_finger_thumb_root_position_z", avatarTransform.hand_right_finger_thumb_root_position_z,
                        "hand_right_finger_thumb_root_rotation_x", avatarTransform.hand_right_finger_thumb_root_rotation_x,
                        "hand_right_finger_thumb_root_rotation_y", avatarTransform.hand_right_finger_thumb_root_rotation_y,
                        "hand_right_finger_thumb_root_rotation_z", avatarTransform.hand_right_finger_thumb_root_rotation_z,
                        "hand_right_finger_index_tip_position_x", avatarTransform.hand_right_finger_index_tip_position_x,
                        "hand_right_finger_index_tip_position_y", avatarTransform.hand_right_finger_index_tip_position_y,
                        "hand_right_finger_index_tip_position_z", avatarTransform.hand_right_finger_index_tip_position_z,
                        "hand_right_finger_index_tip_rotation_x", avatarTransform.hand_right_finger_index_tip_rotation_x,
                        "hand_right_finger_index_tip_rotation_y", avatarTransform.hand_right_finger_index_tip_rotation_y,
                        "hand_right_finger_index_tip_rotation_z", avatarTransform.hand_right_finger_index_tip_rotation_z,
                        "hand_right_finger_index_middle_position_x", avatarTransform.hand_right_finger_index_middle_position_x,
                        "hand_right_finger_index_middle_position_y", avatarTransform.hand_right_finger_index_middle_position_y,
                        "hand_right_finger_index_middle_position_z", avatarTransform.hand_right_finger_index_middle_position_z,
                        "hand_right_finger_index_middle_rotation_x", avatarTransform.hand_right_finger_index_middle_rotation_x,
                        "hand_right_finger_index_middle_rotation_y", avatarTransform.hand_right_finger_index_middle_rotation_y,
                        "hand_right_finger_index_middle_rotation_z", avatarTransform.hand_right_finger_index_middle_rotation_z,
                        "hand_right_finger_index_root_position_x", avatarTransform.hand_right_finger_index_root_position_x,
                        "hand_right_finger_index_root_position_y", avatarTransform.hand_right_finger_index_root_position_y,
                        "hand_right_finger_index_root_position_z", avatarTransform.hand_right_finger_index_root_position_z,
                        "hand_right_finger_index_root_rotation_x", avatarTransform.hand_right_finger_index_root_rotation_x,
                        "hand_right_finger_index_root_rotation_y", avatarTransform.hand_right_finger_index_root_rotation_y,
                        "hand_right_finger_index_root_rotation_z", avatarTransform.hand_right_finger_index_root_rotation_z,
                        "hand_right_finger_middle_tip_position_x", avatarTransform.hand_right_finger_middle_tip_position_x,
                        "hand_right_finger_middle_tip_position_y", avatarTransform.hand_right_finger_middle_tip_position_y,
                        "hand_right_finger_middle_tip_position_z", avatarTransform.hand_right_finger_middle_tip_position_z,
                        "hand_right_finger_middle_tip_rotation_x", avatarTransform.hand_right_finger_middle_tip_rotation_x,
                        "hand_right_finger_middle_tip_rotation_y", avatarTransform.hand_right_finger_middle_tip_rotation_y,
                        "hand_right_finger_middle_tip_rotation_z", avatarTransform.hand_right_finger_middle_tip_rotation_z,
                        "hand_right_finger_middle_middle_position_x", avatarTransform.hand_right_finger_middle_middle_position_x,
                        "hand_right_finger_middle_middle_position_y", avatarTransform.hand_right_finger_middle_middle_position_y,
                        "hand_right_finger_middle_middle_position_z", avatarTransform.hand_right_finger_middle_middle_position_z,
                        "hand_right_finger_middle_middle_rotation_x", avatarTransform.hand_right_finger_middle_middle_rotation_x,
                        "hand_right_finger_middle_middle_rotation_y", avatarTransform.hand_right_finger_middle_middle_rotation_y,
                        "hand_right_finger_middle_middle_rotation_z", avatarTransform.hand_right_finger_middle_middle_rotation_z,
                        "hand_right_finger_middle_root_position_x", avatarTransform.hand_right_finger_middle_root_position_x,
                        "hand_right_finger_middle_root_position_y", avatarTransform.hand_right_finger_middle_root_position_y,
                        "hand_right_finger_middle_root_position_z", avatarTransform.hand_right_finger_middle_root_position_z,
                        "hand_right_finger_middle_root_rotation_x", avatarTransform.hand_right_finger_middle_root_rotation_x,
                        "hand_right_finger_middle_root_rotation_y", avatarTransform.hand_right_finger_middle_root_rotation_y,
                        "hand_right_finger_middle_root_rotation_z", avatarTransform.hand_right_finger_middle_root_rotation_z,
                        "hand_right_finger_ring_tip_position_x", avatarTransform.hand_right_finger_ring_tip_position_x,
                        "hand_right_finger_ring_tip_position_y", avatarTransform.hand_right_finger_ring_tip_position_y,
                        "hand_right_finger_ring_tip_position_z", avatarTransform.hand_right_finger_ring_tip_position_z,
                        "hand_right_finger_ring_tip_rotation_x", avatarTransform.hand_right_finger_ring_tip_rotation_x,
                        "hand_right_finger_ring_tip_rotation_y", avatarTransform.hand_right_finger_ring_tip_rotation_y,
                        "hand_right_finger_ring_tip_rotation_z", avatarTransform.hand_right_finger_ring_tip_rotation_z,
                        "hand_right_finger_ring_middle_position_x", avatarTransform.hand_right_finger_ring_middle_position_x,
                        "hand_right_finger_ring_middle_position_y", avatarTransform.hand_right_finger_ring_middle_position_y,
                        "hand_right_finger_ring_middle_position_z", avatarTransform.hand_right_finger_ring_middle_position_z,
                        "hand_right_finger_ring_middle_rotation_x", avatarTransform.hand_right_finger_ring_middle_rotation_x,
                        "hand_right_finger_ring_middle_rotation_y", avatarTransform.hand_right_finger_ring_middle_rotation_y,
                        "hand_right_finger_ring_middle_rotation_z", avatarTransform.hand_right_finger_ring_middle_rotation_z,
                        "hand_right_finger_ring_root_position_x", avatarTransform.hand_right_finger_ring_root_position_x,
                        "hand_right_finger_ring_root_position_y", avatarTransform.hand_right_finger_ring_root_position_y,
                        "hand_right_finger_ring_root_position_z", avatarTransform.hand_right_finger_ring_root_position_z,
                        "hand_right_finger_ring_root_rotation_x", avatarTransform.hand_right_finger_ring_root_rotation_x,
                        "hand_right_finger_ring_root_rotation_y", avatarTransform.hand_right_finger_ring_root_rotation_y,
                        "hand_right_finger_ring_root_rotation_z", avatarTransform.hand_right_finger_ring_root_rotation_z,
                        "hand_right_finger_pinky_tip_position_x", avatarTransform.hand_right_finger_pinky_tip_position_x,
                        "hand_right_finger_pinky_tip_position_y", avatarTransform.hand_right_finger_pinky_tip_position_y,
                        "hand_right_finger_pinky_tip_position_z", avatarTransform.hand_right_finger_pinky_tip_position_z,
                        "hand_right_finger_pinky_tip_rotation_x", avatarTransform.hand_right_finger_pinky_tip_rotation_x,
                        "hand_right_finger_pinky_tip_rotation_y", avatarTransform.hand_right_finger_pinky_tip_rotation_y,
                        "hand_right_finger_pinky_tip_rotation_z", avatarTransform.hand_right_finger_pinky_tip_rotation_z,
                        "hand_right_finger_pinky_middle_position_x", avatarTransform.hand_right_finger_pinky_middle_position_x,
                        "hand_right_finger_pinky_middle_position_y", avatarTransform.hand_right_finger_pinky_middle_position_y,
                        "hand_right_finger_pinky_middle_position_z", avatarTransform.hand_right_finger_pinky_middle_position_z,
                        "hand_right_finger_pinky_middle_rotation_x", avatarTransform.hand_right_finger_pinky_middle_rotation_x,
                        "hand_right_finger_pinky_middle_rotation_y", avatarTransform.hand_right_finger_pinky_middle_rotation_y,
                        "hand_right_finger_pinky_middle_rotation_z", avatarTransform.hand_right_finger_pinky_middle_rotation_z,
                        "hand_right_finger_pinky_root_position_x", avatarTransform.hand_right_finger_pinky_root_position_x,
                        "hand_right_finger_pinky_root_position_y", avatarTransform.hand_right_finger_pinky_root_position_y,
                        "hand_right_finger_pinky_root_position_z", avatarTransform.hand_right_finger_pinky_root_position_z,
                        "hand_right_finger_pinky_root_rotation_x", avatarTransform.hand_right_finger_pinky_root_rotation_x,
                        "hand_right_finger_pinky_root_rotation_y", avatarTransform.hand_right_finger_pinky_root_rotation_y,
                        "hand_right_finger_pinky_root_rotation_z", avatarTransform.hand_right_finger_pinky_root_rotation_z,
                    ]
                );
                roomId = await this.userClient?.hget(avatarTransform.uid, "roomId");
            } catch (err) {
                console.log("IOREDIS: ", err);
            }
        }
        return roomId;
    }

    async getGuest(uid:string){
        let guest: Guest|undefined = undefined;
        try {
            const result: any = await this.userClient?.hgetall(uid);
            if(result !== null ){
                guest = result as Guest;
            }
        } catch (err) {
            console.log("IOREDIS: ", err);
        }
        return guest;
    }

    async getGuestList(roomId:string, uid: string){
        let result: Array<any> = [];
        try{
            let guestUids = await this.userClient?.smembers(roomId);
            guestUids = guestUids.filter((guestUid) => guestUid !== uid);
            let guestPromises: Array<any> = [];
            guestUids.map((guestUid) => {
                guestPromises.push(this.userClient?.hgetall(guestUid));
            });
            result = await Promise.all(guestPromises);
        } catch (err) {
            console.log("IOREDIS: ", err);
        }
        return result;
    }

    async removeGuest(uid: string){
        let guest: any = undefined;
        try {
            const guestData = await this.userClient?.hgetall(uid);
            if(guestData !== null){
                guest = guestData;
            }
            await this.userClient?.srem(guest.roomId, uid);
            await this.userClient?.del(uid);
        } catch (err) {
            console.log("IOREDIS: ", err);
        }
        return guest;
    }

    async modifyAsset(assetTransform : AssetTransform){
        const asset: Asset = { 
            name: assetTransform.name, 
            position_x: assetTransform.position_x,
            position_y: assetTransform.position_y,
            position_z: assetTransform.position_z,
            rotation_x: assetTransform.rotation_x,
            rotation_y: assetTransform.rotation_y,
            rotation_z: assetTransform.rotation_z
        };
        await this.assetClient?.hset(assetTransform.name, asset);
        return asset;
    }
}

export default new redisService();