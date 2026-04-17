import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method === 'POST') {
      if (req.body instanceof FormData) {
        return next.handle(req);
      }
      const sanitizedBody = this.sanitize(req.body);
      const clonedRequest = req.clone({
        body: sanitizedBody,
      });
      return next.handle(clonedRequest);
    }
    return next.handle(req);
  }

  private sanitize(body: any): any {
    if (!body || typeof body !== 'object') {
      return body;
    }
    const sanitizedBody = body ;
    delete sanitizedBody.unwantedField;

    // Example: Trim strings in all properties
    // for (const key in sanitizedBody) {
    //   if (typeof sanitizedBody[key] === 'string') {
    //     sanitizedBody[key] = sanitizedBody[key].trim();
    //   }
    // }

    return sanitizedBody;
  }
}
