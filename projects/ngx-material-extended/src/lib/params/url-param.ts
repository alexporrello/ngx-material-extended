import { inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

export function urlParam() {
    const route = inject(ActivatedRoute);
    const router = inject(Router);

    route.fragment.subscribe((frag) => {
        console.log(frag);
    });

    route.queryParams.subscribe((val) => {
        console.log(val);
    });

    route.url.subscribe((route) => {
        console.log(route);
    });

    route.parent?.paramMap.subscribe((val) => {
        console.log(val);
    });
}
