import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../components/Table/table.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [ReactiveFormsModule,CommonModule,TableComponent],
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  posts: any[] = [];
  isModalOpen = true;

  constructor(private postService: PostService) {}

  ngOnInit() {
    // this.posts = this.postService.getPosts();
  }

  
}
