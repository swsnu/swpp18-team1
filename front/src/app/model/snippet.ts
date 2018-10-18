import { DirectMessageComponent } from '../app/direct-message/direct-message.component';
import { ChannelComponent } from '../app/channel/channel.component';

export class Snippet {
    user_id: number;
    snippetable_id: string;
    snippetable_type: DirectMessageComponent | ChannelComponent;
    content: Text;
}