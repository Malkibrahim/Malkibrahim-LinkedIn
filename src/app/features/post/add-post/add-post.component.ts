import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "../../profile/Users.service";
import { User } from "src/app/_model/user";
import { Community } from "src/app/_model/community";
import { Post } from "src/app/_model/posts";
import { Comment } from "@angular/compiler";
import { Comments } from "src/app/_model/comment";
import { CommunityService } from "../community.service";

@Component({
  selector: "app-add-post",
  templateUrl: "./add-post.component.html",
  styleUrls: ["./add-post.component.scss"]
})
export class AddPostComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    public userService: UserService,
    public communityService: CommunityService,
    private router: Router
  ) {}
  userId: number;
  user: User;
  newPost: Community;
  community: Community[];
  @ViewChild("post", { static: false }) post: ElementRef;
  ngOnInit() {
    let id = parseInt(this.route.snapshot.paramMap.get("id"));
    this.userId = id;
    this.user = this.userService.getById(this.userId);
    this.community = this.communityService.getAll();
    console.log(this.userId);
  }
  onPost() {
    // debugger;
    let postbody = (this.post.nativeElement as HTMLInputElement).value;
    let userId = this.userId;
    console.log(userId);
    this.communityService.addPost(postbody, userId);
    // console.log(this.community);
    this.communityService.postAdded.next(userId);
  }
}
