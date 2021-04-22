import { TestBed } from "@angular/core/testing";
import { AlertController } from "@ionic/angular";
import { AlertService } from "./alert.service";

describe("AlertService", () => {
  let service: AlertService;

  beforeEach(() => {
    const alertControllerStub = () => ({
      create: object => ({ then: () => ({}) })
    });
    TestBed.configureTestingModule({
      providers: [
        AlertService,
        { provide: AlertController, useFactory: alertControllerStub }
      ]
    });
    service = TestBed.inject(AlertService);
  });

  it("can load instance", () => {
    expect(service).toBeTruthy();
  });
});
