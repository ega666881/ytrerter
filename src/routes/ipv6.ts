import { Elysia } from 'elysia';
import { DomainQuerySchema } from '../dto/ipv6.dto';
import { isIpv6SupportedController } from '../controllers/ipv6.controller';
import { fiveRequestsPerMinute } from '../middlewares/ipv6RateLimit';



const ipv6Routes = new Elysia()
    .get(
        '/api/ipv6/check-supported', 
        isIpv6SupportedController, 
        {
            query: DomainQuerySchema,
            beforeHandle: fiveRequestsPerMinute()
        }
    )

export default ipv6Routes;