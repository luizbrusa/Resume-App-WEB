import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { AppConstants } from '../app-constants';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (AppConstants.isUsuarioAutenticado) {
      const token = `Bearer ${localStorage.getItem('token')}`;

      const tokenRequest = req.clone({
        headers: req.headers
          .set('Authorization', token)
      });

      return next.handle(tokenRequest).pipe(tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse && (event.status === 200 || event.status === 201)) {
          console.info('Sucesso na Operação [InterceptorService]');
        }
      }), catchError(this.processaError));
    } else {
      return next.handle(req).pipe(catchError(this.processaError));
    }
  }

  processaError( erro: HttpErrorResponse ) {
    let errorMessage = 'Erro Desconhecido';

    if ( erro.error instanceof ErrorEvent ) {
      errorMessage = 'Erro: ' + erro.error.error;
    } else if (erro.status === 403) {
        errorMessage = 'Acesso Negado: Faça Login novamente!';
    } else {
      errorMessage = 'Código: ' + erro.error.code + '\nMensagem: ' + erro.error.error;
    } 

    window.alert(errorMessage);
    return throwError( errorMessage );
  }
  
}

@NgModule({
  providers : [{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  }]
})

export class HttpInterceptorModule {}