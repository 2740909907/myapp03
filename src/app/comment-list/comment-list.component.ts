// comment-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Comment } from '../comment';
import { CommentService } from '../services/comment.service';
@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
})
export class CommentListComponent implements OnInit {
  comments: Comment[] | undefined;
  constructor(private commentService: CommentService) { }
  ngOnInit() {
    this.commentService.comments$.subscribe(comments => this.comments = comments);
  }
}