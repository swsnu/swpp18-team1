import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QrComponent } from './qr.component';
import { ChannelService } from 'src/service/channel.service';

describe('QrComponent', () => {
  let component: QrComponent;
  let fixture: ComponentFixture<QrComponent>;

  let mockChannelService: jasmine.SpyObj<ChannelService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrComponent ],
      providers: [
        {
          provide: ChannelService
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrComponent);
    component = fixture.componentInstance;

    mockChannelService = TestBed.get(ChannelService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
