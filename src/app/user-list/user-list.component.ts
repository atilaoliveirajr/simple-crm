import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'src/models/user.class';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})

export class UserListComponent implements OnInit {
  user: User = new User();
  displayedColumns = ['firstName', 'city', 'email'];
  allUsers = [];


  constructor(private firestore: AngularFirestore) {

  }

  ngOnInit(): void {
    this.firestore
    .collection('users')
    .valueChanges({idField: 'id'})
    .subscribe((changes: any) => {
      console.log('changes from DB', changes)
      this.allUsers = changes;
    })
  }
}
