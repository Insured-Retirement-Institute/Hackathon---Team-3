import { Pipe, PipeTransform } from '@angular/core';
import { SystemMessage } from '../interface/systemmessage';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();
    return items.filter(item => {
      return item.polNumber.toString().toLowerCase().includes(searchText) ||
             item.carrierName.toLowerCase().includes(searchText) ||
             item.lineOfBusiness.toLowerCase().includes(searchText) ||
             item.productType.toLowerCase().includes(searchText) ||
             item.alertReceivedDate.toLowerCase().includes(searchText) ||
             (item.systemMessages && item.systemMessages.some((message: SystemMessage) => 
               message.messageDescription.toLowerCase().includes(searchText)
             ));
    })
  }
}
