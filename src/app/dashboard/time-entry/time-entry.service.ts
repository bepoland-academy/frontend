import { Injectable } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Injectable()
export class TimeEntryService {
  constructor(private httpService: HttpService) {}
  endpoint = 'tracks';

  getTracks() {
    return this.httpService.get(this.endpoint);
  }
}
