import {
    Controller,
    Get,
    Param,
    Query,
    NotFoundException
} from '@nestjs/common';
import { query, getAffiliation } from "../service/affiliation.service";

@Controller('api/nominations/affiliations')
export class AffiliationController {
    //TODO: GraphQL probably better here.
    @Get()
    async getAll(@Query('search') search, @Query('page') page) {
        const results = await query({
            page, 
            search
          })

        return results
    }

    @Get('/:id')
    async getById(@Param('id') id) {
        const household = await getAffiliation(id);

        if(!household) throw new NotFoundException();

        return household;
    }
}