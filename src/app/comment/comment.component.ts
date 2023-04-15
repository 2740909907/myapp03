// comment.component.ts
import { Component, OnInit } from '@angular/core';
import { CommentService } from '../services/comment.service';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  username: any;
  message: any;
  constructor(private commentService: CommentService) { }
  ngOnInit() {}
  addComment() {
    const newComment = {
      id: Date.now(),
      username: this.username,
      message: this.message,
      date: new Date()
    };
    this.commentService.addComment(newComment);
    this.username = '';
    this.message = '';
  }
}