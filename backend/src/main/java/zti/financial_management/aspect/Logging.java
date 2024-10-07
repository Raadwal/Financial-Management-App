package zti.financial_management.aspect;

import jakarta.servlet.http.HttpServletRequest;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.Arrays;

@Aspect
@Component
public class Logging {
    @Pointcut("within(@org.springframework.web.bind.annotation.RestController *)")

    public void restController() {
    }

    @Before("restController()")
    public void logBefore(JoinPoint joinPoint) {
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = attributes.getRequest();

        System.out.println("Request URL: " + request.getRequestURL().toString());
        System.out.println("HTTP Method: " + request.getMethod());
        System.out.println("Class Method: " + joinPoint.getSignature().getDeclaringTypeName() + "." + joinPoint.getSignature().getName());
        System.out.println("Request Args: " + Arrays.toString(joinPoint.getArgs()));
    }

    @After("restController()")
    public void logAfter(JoinPoint joinPoint) {
        System.out.println("Endpoint " + joinPoint.getSignature().getDeclaringTypeName() + "." + joinPoint.getSignature().getName() + " has been accessed");
    }
}
