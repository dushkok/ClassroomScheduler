import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BuildingService } from 'services/building.service';

@Component({
  selector: 'crs-create-building',
  templateUrl: './create-building.component.html',
  styleUrls: ['./create-building.component.scss']
})
export class CreateBuildingComponent implements OnInit {

  @Output() public newBuilding: EventEmitter<any> = new EventEmitter<any>();
  public buildingForm: FormGroup;
  public opened: boolean = false;
  public buildingId: number;


  constructor(private buildingService: BuildingService ) { }

  ngOnInit() {
    this.buildingForm = this.initBuildingForm();
  }

  public open(buildingId = null) {
    this.buildingId = buildingId;
    this.opened = true;

    if(this.buildingId){
      this.getBuildingById(this.buildingId);
    }
  }

  submit() {
    if (this.buildingForm.invalid) { return; }

    const building = Object.assign({}, this.buildingForm.value);

    if (this.buildingId) {
      this.updateBuilding(this.buildingId, building);
    } else {
      this.createBuilding(building);
    }
  }

  private createBuilding(building) {
    this.buildingService.createBuilding(building).subscribe(res =>{
      this.buildingForm.reset();
      this.opened = false;
      this.newBuilding.emit();
    }, err => console.error(err));
  }

  private updateBuilding(id, building) {
    this.buildingService.updateBuilding(id, building).subscribe(res => {
      this.buildingForm.reset();
      this.opened = false;
      this.newBuilding.emit();
    }, err => console.error(err));
  }

  getBuildingById(id) {
    this.buildingService.getBuildingById(id).subscribe(res => this.buildingForm.patchValue(res), err => console.error(err));
  }


  private initBuildingForm() {
    return new FormGroup({
      name: new FormControl(null, Validators.required)
    });
  }

  get name() { return this.buildingForm.get('name');}
}
