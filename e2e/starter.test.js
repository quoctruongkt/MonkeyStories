import {device, element, by, expect} from 'detox';

describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp({newInstance: true});
  });

  beforeEach(async () => {});

  it('kiem tra da hien man home chua', async () => {
    const helloElement = element(by.id('hello'));
    await expect(helloElement).toBeVisible();
  });
});
