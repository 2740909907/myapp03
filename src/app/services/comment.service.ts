import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Comment } from '../comment';
@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private commentsSubject: BehaviorSubject<Comment[]> = new BehaviorSubject<Comment[]>([]);
  public comments$ = this.commentsSubject.asObservable();
  constructor() { }
  getComments(): Comment[] {
    return this.commentsSubject.value;
  }
  addComment(comment: Comment) {
    const currentComments = this.commentsSubject.value;
    const newComments = [...currentComments, comment];
    this.commentsSubject.next(newComments);
  }
}