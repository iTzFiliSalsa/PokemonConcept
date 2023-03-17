import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse
} from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class HttpLoadingInterceptor implements HttpInterceptor {
    private requests: HttpRequest<any>[] = [];

    constructor(
        private loaderService: LoaderService
    ) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        this.requests.push(request);

        this.loaderService.isLoading.next(true);
        return new Observable((observer: Observer<any>) => {
            const subscription = next.handle(request)
                .subscribe(
                    event => {
                        if (event instanceof HttpResponse) {
                            this.removeRequest(request);
                            observer.next(event);
                        }
                    },
                    err => {
                        this.removeRequest(request);
                        observer.error(err);
                    },
                    () => {
                        this.removeRequest(request);
                        observer.complete();
                    });

            return () => {
                this.removeRequest(request);
                subscription.unsubscribe();
            };
        });
    }

    removeRequest(req: HttpRequest<any>) {
        const i = this.requests.indexOf(req);
        if (i >= 0) {
            this.requests.splice(i, 1);
        }
        this.loaderService.isLoading.next(this.requests.length > 0);
    }
}
