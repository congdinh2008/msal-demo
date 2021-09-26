import { MessageChannelNameConstant } from "@constants/core/message-channel-name.constant";

export class AppMessageChannelEvent {
  public readonly channelName: string = MessageChannelNameConstant.appChannel;
  public readonly eventName: string;

  constructor(eventName: string) {
    this.eventName = eventName;
  }
}