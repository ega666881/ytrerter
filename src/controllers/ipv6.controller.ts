
import { Context } from "elysia";
import { CheckIpV6Dto } from "../dto/ipv6.dto";
import { isIpv6Supported } from "../utils/isIpv6Supported";



export const isIpv6SupportedController = async (context: Context) => {
    const { domain } = context.query as CheckIpV6Dto

    return isIpv6Supported(domain)
    
}