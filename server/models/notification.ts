import mongoose, { Model, Schema } from "mongoose";
import { EnumType } from "typescript";

export interface INotification extends Document {
    title: string;
    message: string;
    status: statusVals;
    userId: string;
}
export enum statusVals {
    UNREAD = 'Unread',
    READ = 'Read'
}

const notificationSchema = new Schema<INotification>({
    title: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: Object.values(statusVals),
        required: true,
        default: statusVals.UNREAD
    }
})

const notificationModel: Model<INotification> = mongoose.model("Notification", notificationSchema);
export default notificationModel