import { Query, Resolver } from '@nestjs/graphql';
import { AffiliationService } from './affiliation.service';

@Resolver('Affiliation')
export class AffiliationsResolver {
  constructor(private readonly affiliationService: AffiliationService) {}

  @Query('affiliation')
  async getAffiliation(obj, args, context, info) {
    const affiliation = await this.affiliationService.getAffiliation(args.id);

    return affiliation;
  }

  @Query('affiliations')
  async getAffiliations(obj, args, context, info) {
    const { totalSize, per_page: perPage, last_page: lastPage, page, items } = await this.affiliationService.query();

    return { totalSize, perPage, lastPage, page, items };
  }
}
