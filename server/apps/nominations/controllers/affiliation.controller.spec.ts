import { Test } from '@nestjs/testing';
import { NotFoundException } from "@nestjs/common";
import { AffiliationController } from './affiliation.controller';
import { AffiliationService } from '../service/affiliation.service';

describe('AffiliationController', () => {
  let controller: AffiliationController;
  let service: AffiliationService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [AffiliationController],
      components: [AffiliationService],
    }).compile();

    service = module.get<AffiliationService>(AffiliationService);
    controller = module.get<AffiliationController>(AffiliationController);
  });

  describe('getAll', () => {
    it('should return an empty array', async () => {
      const result = [];
      jest.spyOn(service, 'query').mockImplementation(() => result);

      expect(await controller.getAll()).toBe(result);
    });
  });

  describe('getById', () => {
    it('throws NotFoundException on user undefined', async () => {
      expect.assertions(1);

      jest.spyOn(service, 'getAffiliation').mockImplementation(() => undefined);

      try {
        await controller.getById(1);
      } catch (e) {
        expect(e).toEqual(new NotFoundException());
      }
    });
  });
});