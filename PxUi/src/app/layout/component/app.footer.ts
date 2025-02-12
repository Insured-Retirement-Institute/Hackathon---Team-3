import { Component } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-footer',
    template: `<div class="layout-footer">
        Powered by
        <a href="https://www.proformex.com/" target="_blank" rel="noopener noreferrer" class="text-primary font-bold hover:underline">Proformex</a>
    </div>`
})
export class AppFooter {}
