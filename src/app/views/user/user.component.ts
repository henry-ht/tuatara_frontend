import { NotificationService } from './../../core/services/notification.service';
import { RequestsService } from './../../core/services/request.service';
import { Component, OnInit } from '@angular/core';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faBan, faSort, faPaperPlane, faCheck, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  faEdit    = faEdit;
  faTrash    = faTrash;
  faBan     = faBan;
  faSort    = faSort;
  faPaperPlane  = faPaperPlane;
  faCheck       = faCheck;
  faPlus = faPlus;

  orderBy:boolean = true;
  textSearch:string = '';
  protected ngUnsubscribe:Subject<void> = new Subject<void>();

  loadPage:boolean = false;
  users:any = {
      data: []
  };
  page:number = 1;
  closeResult = '';
  modalReference!:NgbModalRef;
  editCreatedForm:FormGroup;

  pageChange($event:any){
    this.page = $event;
    this.getData();
  }

  constructor(private http:RequestsService, private modalService: NgbModal, private fb: FormBuilder, private noti:NotificationService) {
    this.editCreatedForm = this.fb.group({
      id: [''],
      name: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(150),
      ]],
      email: ['', [
        Validators.required,
      ]],
    });
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(search?:string){
    if(this.users.data.length){
      this.users.data  = [];
    }
    this.loadPage = true;
    let send:any = {
      total: 10,
      page: this.page,
      order_by: (this.orderBy ? 'ASC':'DESC')
    };
    if(search){
      send['search']  = search;
      send['page']    = 1;
    }

    this.http.get('user', send)
    .subscribe((data:any)=>{
      this.users = data['data'];
    }, (error)=>{}, ()=>{ this.loadPage = false;});
  }

  open(idModal:any) {
    this.modalReference = this.modalService.open(idModal, {
      windowClass: 'app-modal-base'
    });
    this.modalReference.result.then((result: any) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason: any) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  disabled(id:number, status:boolean){
    this.loadPage = true;
    this.http.put("user/"+id, {disabled: (status ? 0:1) })
    .subscribe((data:any)=>{
      if(data.status == "success"){
        this.getData();
      }
    }, (error)=>{}, ()=>{ this.loadPage = false;});
  }

  addToEdit(data:any){
    this.editCreatedForm.patchValue(data);
  }

  clearForm(){
    this.editCreatedForm.reset();
  }

  onSubmit(){
    if(!this.editCreatedForm.invalid){
      if(this.editCreatedForm.controls['id'].value){
        this.edit();
      }else{
        this.save();
      }
    }
  }

  private save(){
    this.loadPage = true;
    let send = this.editCreatedForm.value;

    for (let prop in send) {
      if (!send[prop]) {
        delete send[prop];
      }
    }

    this.http.save("user", send)
    .subscribe((data:any)=>{
      if(data.status == "success"){
        this.getData();
        this.clearForm();
        this.modalReference.close();
      }
      if(data.message){
        this.noti.printMsj(data);
      }
    }, (error)=>{}, ()=>{ this.loadPage = false;});
  }

  private edit(){
    this.loadPage = true;
    let send = this.editCreatedForm.value;

    for (let prop in send) {
      if (!send[prop]) {
        delete send[prop];
      }
    }

    this.http.put("user/"+send.id, send)
    .subscribe((data:any)=>{
      if(data.status == "success"){
        this.getData();
        this.clearForm();
        this.noti.success(data.message['message'][0]);
        this.modalReference.close();
      }
    }, (error)=>{}, ()=>{ this.loadPage = false;});
  }

  delete(id:number){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.loadPage = true;

        this.http.delete("user/"+id)
        .subscribe((data:any)=>{
          if(data.status == "success"){
            this.getData();
            this.noti.success(data.message['message'][0]);
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            );
          }else{
            Swal.fire(
              'Cancelled',
              'Your imaginary file is safe :)',
              'error'
            )
          }
        }, (error)=>{}, ()=>{ this.loadPage = false;});

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }

  isValid() {
    return this.editCreatedForm.controls;
  }

  onKeyUp(){
    this.ngOnDestroy();
    if(this.textSearch.length >= 3){
      this.getData(this.textSearch);
    }else if(this.textSearch.length == 0){
      this.getData();
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
