import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { PostService } from '../../services/post.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

export interface UserData {
  _id: string;
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatToolbarModule,
    MatCardModule,
    ReactiveFormsModule
  ]
})
export class TableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'content', 'title', 'createdAt', 'actions'];
  dataSource = new MatTableDataSource<UserData>([]); // Start with an empty array
  postForm: FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  selectedPost:any;
  constructor(private postService: PostService, public dialog: MatDialog,private fb: FormBuilder) {
    this.postForm = this.fb.group({
        title: [this.selectedPost?.title || '', Validators.required],
        content: [this.selectedPost?.content || '', Validators.required]
      });
  }
isModalOpen:any = false;
isEdit:any=false;
  ngOnInit() {
    this.getPosts();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  onSubmit() {
    if (this.postForm.valid) {
      const obj={ ...this.selectedPost, ...this.postForm.value }
      console.log("GGG",obj);
      if(this.isEdit){
        this.postService.updatePost(obj,obj.id).subscribe({
          next: (data) => {
            console.log("data", data);
            this.getPosts(); // Refresh posts after successful add
            this.isModalOpen = false; // Close modal
            alert("Post updated successfully!");
          },
          error: (error) => {
            console.error("Error adding post:", error);
            alert("Post updated failed!");
          }
        });
      }
      else{
        this.postService.addPost(obj).subscribe({
          next: (data) => {
            console.log("data", data);
            this.getPosts(); // Refresh posts after successful add
            this.isModalOpen = false; // Close modal
            alert("Post added successfully!");
          },
          error: (error) => {
            console.error("Error adding post:", error);
            alert("Post added failed!");
          }
        });
      }
    
    }
  }
  onCancel(): void {
    this.isEdit=false
    this.selectedPost = null;
    this.isModalOpen=false
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getPosts() {
    this.postService.getPosts().subscribe({
      next: (data: any) => {
        console.log("Posts received:", data.data);
        this.dataSource.data = data.data.map((post: any) => ({
          id: post._id,  // Renaming _id to id
          title: post.title,
          content: post.content,
          createdAt: post.createdAt
        }));
        console.log("Posts mapped:", this.dataSource.data);
      },
      error: (error) => {
        console.error("Error fetching posts:", error);
      }
    });
  }
  edit(post: any) {
    this.isEdit=true
    this.selectedPost = post;
    this.isModalOpen=true
    this.postForm.patchValue(post);
    console.log("Edit button clicked", this.selectedPost);
 
  }
  addNewPost() {
  this.isModalOpen=true
  }
  onDelete(post: any) {
    this.postService.deletePost(post.id).subscribe({
      next: (data: any) => {
        console.log("Post deleted:", data);
        this.getPosts();
        alert("Post deleted successfully");
      },
      error: (error) => {
        console.error("Error deleting post:", error);
        alert("Error deleting post")
      }
    });
  }
  
}
