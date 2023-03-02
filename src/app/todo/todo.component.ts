import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { faTrash, faPen, faAdd } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  todoArray: any[] = [];
  faTrash = faTrash;
  faPen = faPen;
  faAdd = faAdd;
  firestoreCollection: AngularFirestoreCollection;
  inputReadonly = false;
  editClicked = false;

  constructor(private firestore: AngularFirestore) {
    this.firestoreCollection = firestore.collection('todos');
  }

  ngOnInit(): void {
    this.firestoreCollection
      .valueChanges({ idField: 'id' })
      .subscribe((todo) => {
        this.todoArray = todo;
      });
  }

  addTodo(todoItem: string) {
    this.firestoreCollection.add({
      todoItem: todoItem,
    });
  }

  editTodo(id: string, todoItem: string) {
    this.firestoreCollection.doc(id).update({ todoItem: todoItem });
  }

  deleteTodo(id: string) {
    this.firestoreCollection.doc(id).delete();
  }

  editClick() {
    this.editClicked = !this.editClicked;
  }

  onClick(todoItem: HTMLInputElement) {
    if (todoItem.value) {
      // so that we don't send any empty string to the firebase collection
      this.addTodo(todoItem.value);
      todoItem.value = '';
    }
  }

  onTodoUpdate(id: string, todoItem: HTMLInputElement) {
    if (todoItem.value) {
      this.editTodo(id, todoItem.value);
      this.editClicked = !this.editClicked;
    }
  }
}
