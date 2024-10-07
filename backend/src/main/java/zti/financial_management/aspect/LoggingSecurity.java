package zti.financial_management.aspect;

import lombok.AllArgsConstructor;
import org.apache.coyote.Response;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import zti.financial_management.auth.AuthenticationResponse;
import zti.financial_management.config.JwtService;

@AllArgsConstructor
@Aspect
@Component
public class LoggingSecurity {

    JwtService jwtService;

    @Pointcut("execution(public org.springframework.http.ResponseEntity zti.financial_management.auth.AuthenticationController.register(..))")
    public void userRegistration() {}

    @Pointcut("execution(public org.springframework.http.ResponseEntity zti.financial_management.auth.AuthenticationController.authenticate(..))")
    public void userAuthentication() {}

    @AfterReturning(pointcut = "userRegistration()", returning = "response")
    public void logUserRegistration(JoinPoint joinPoint, ResponseEntity<AuthenticationResponse> response) {
        if(response.getStatusCode().is2xxSuccessful()) {
            String username = jwtService.extractUsername(response.getBody().getToken());
            System.out.println("New user registered: " + username);
        }
    }

    @AfterReturning(pointcut = "userAuthentication()", returning = "response")
    public void logUserAuthentication(JoinPoint joinPoint, ResponseEntity<AuthenticationResponse> response) {
        if(response.getStatusCode().is2xxSuccessful()) {
            String username = jwtService.extractUsername(response.getBody().getToken());
            System.out.println("User authenticated successfully: " + username);
        }
    }
}
