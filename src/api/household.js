// @flow
import apiService from 'lib';

const householdApi = {
  getHousehold: function(householdId: number): Promise<any> {
    return apiService.get(`/household/${householdId}`);
  },

  getHouseholdList: function(pageNumber: number = 0, search: ?string): Promise<any> {
    return apiService.get('/household', { page: pageNumber, search: search });
  }
};
