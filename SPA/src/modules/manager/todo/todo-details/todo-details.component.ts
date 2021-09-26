import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TODO_SERVICE_INJECTOR } from 'src/constants/injection-token.constant';
import { GuidHelper } from 'src/helper/core/guid-helper/guid-helper';
import { ITodoService } from 'src/services/interfaces/todo-service.interface';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.scss'],
})
export class TodoDetailsComponent implements OnInit {
  /** OUTPUTS */
  @Output() cancelForm: EventEmitter<any> = new EventEmitter();
  @Output() saveForm: EventEmitter<any> = new EventEmitter();

  public itemDetail: any;
  public tempGuid!: string;
  public isEdit!: boolean;

  public form!: FormGroup;
  public description!: FormControl;
  public status!: FormControl;

  public statusSource = [
    { id: true, name: 'Completed' },
    { id: false, name: 'Not Completed' },
  ];

  //#region PRIVATE PROPERTIES

  private _id!: string;
  /** SETTERS */
  /**
   * set id
   */
  @Input('id')
  public set id(data: string) {
    this._id = data;
    if (this._id) {
      this.getDetails();
    } else {
      this.tempGuid = GuidHelper.newGuid();
      if (this.form) {
        this.form.reset();
      }
      this.itemDetail = null;
      this.isEdit = false;
    }
  }

  /** GETTERS */
  /**
   * get id
   */
  public get id(): string {
    return this._id;
  }

  constructor(
    @Inject(TODO_SERVICE_INJECTOR)
    private todoService: ITodoService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  /**
   * cancel form
   */
  public cancel() {
    this.cancelForm.emit(true);
  }

  /**
   * reset form
   */
  public reset() {
    this.form.reset();
    if (this.isEdit) {
      this.updateFormValue();
    }
    this.itemDetail = null;
  }
  private updateFormValue() {
    console.log(this.itemDetail);
    
    this.form.patchValue({
      description: this.itemDetail.description,
      status: this.itemDetail.status,
    });
  }

  /**
   * save
   */
  public save() {
    // Form is not valid.
    if (this.form.invalid) {
      return;
    }

    let params = Object.assign({}, this.form.value);
    if (this.isEdit) {
      // edit
      params = Object.assign({}, params, {
        id: this._id,
      });

      this.todoService.update(params).subscribe((res) => {
        this.saveForm.emit(true);
      });
    } else {
      // create
      params = Object.assign({}, params, {
        id: GuidHelper.newGuid(),
      });
      this.todoService.create(params).subscribe((res) => {
        this.saveForm.emit(true);
      });
    }
  }

  /**
   * create form
   */
  private createForm() {
    this.description = new FormControl('', Validators.required);
    this.status = new FormControl(true, Validators.required);
    this.form = new FormGroup({
      description: this.description,
      status: this.status,
    });
  }

  private getDetails() {
    this.todoService.get(this._id).subscribe((todo) => {
      this.itemDetail = todo;
      this.isEdit = true;
      this.updateFormValue();
    });
  }
}
