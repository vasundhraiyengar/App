import { TestBed } from '@angular/core/testing';

import { ItemService } from './item.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
describe('ItemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        {provide: ItemService, useClass: ItemService},
      ]
    })
  });



  it('should be created', () => {
    const service: ItemService = TestBed.get(ItemService);
    expect(service).toBeTruthy();
  });
});
