import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpResponse, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { mergeMap, materialize, dematerialize, delay } from 'rxjs/operators';

const users = [
    {
        username: 'demo',
        password: 'demo',
        id: Math.ceil(Math.random() * 100),
        firsName: 'demo',
        lastName: 'demo',
        token: 'JWT-Token'
    }
];

@Injectable({
    providedIn: 'root'
})
export class FakeInterceptorService implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;
        //pop
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/authenticate') && method == 'POST':
                    return authenticate();
                case url.match(/availableProperties\/\d+$/) && method == 'GET':
                    return getAvailableProperties();                    
                default:
                    return next.handle(request);
            }
        }

        function authenticate() {
            const { username, password } = body;
            let user = users.find(user => username == user.username);
            if (!user) {
                return error('Not a valid user.');
            }

            return ok({
                id: user.id,
                firstName: user.firsName,
                lastName: user.lastName,
                token: user.token
            });
        }

        function getAvailableProperties() {
            function generateProperties(len=10000) {
                return {
                    id:generateRandomNumbers(len),
                    name: generateString(20),
                    address1: generateString(30),
                    address2: generateString(30),
                    price: generatePriceValue(),
                    type: generatePropertyType()
                }
            }

            function generateRandomNumbers(len=100) {
                return Math.ceil(Math.random()*len);
            }

            function generatePriceValue() {
                return Math.floor(3000000 + Math.random()*5000000);
            }

            function generatePropertyType() {
                let types: any[] = ['2BHK', '1BHK', '3BDIV', '4BDIV', '6BDIV'];
                return types[Math.ceil(Math.random()*types.length)];
            }

            function generateString(len) {
                let text = "";
                let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                for (var i = 0; i < len; i++) {
                    text += possible.charAt(Math.floor(Math.random() * possible.length));
                }

                return text;
            }

            let properties: any[] = [];

            for (let i = 0; i < 10000; i++) {
                properties.push(generateProperties());
            }

            return ok(properties);

        }

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function error(message) {
            return throwError({ error: { message } });
        }
    }

    constructor() { }
}

export const fakeBackendProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: FakeInterceptorService,
    multi: true
};