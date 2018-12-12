import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../../service/user.service';
import { ChannelService } from 'src/service/channel.service';
import { User } from '../../model/user';


@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.css']
})
export class AccessComponent implements OnInit {

  channelHash: string;
  channelTitle: string = "";
  user: User = new User({image: "defaultImage"})

  constructor(
    private userService: UserService,
    private channelService: ChannelService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.channelHash = this.route.snapshot.params['channel_hash'];
    this.channelService.getChannel(this.channelHash).then((channel) => {
      this.channelTitle = channel.title
    })
    this.user.username = this.nameRecommender()
  }

  access(): boolean {

    if(!this.user.image.trim()) { return; }
    if(!this.user.username.trim()) { return; }

    this.userService.createUser(this.channelHash, {image: this.user.image, username: this.user.username} as Partial<User>)
      .then(() => {
          this.router.navigate([`/channel/${this.channelHash}`]);
      });
  }

  nameRecommender(): string {
    const names = [
      "물 먹는 하마",
      "목이 아픈 기린",
      "맨날 짖는 강아지",
      "턱이 아픈 악어",
      "꿀 먹는 곰",
      "질겅이는 송아지",
      "하품하는 고양이",
      "달리는 호랑이",
      "멍 때리는 사자",
      "눈이 침침한 독수리",
      "다리 아픈 말",
      "배 아픈 돼지",
      "목이 쑤신 비둘기",
      "추운 이구아나",
      "부리가 무거운 펠리컨",
      "놀고 있는 개미",
      "일하는 베짱이",
      "늦잠 잔 닭",
      "넘어진 병아리",
      "자빠진 오리",
    ]
    return names[Math.floor(Math.random() * names.length)];
  }

}
