import getURL from "../common/getURL";
import config from "../config";

describe("getURL", () => {
  it("should return the correct url", () => {
    let url = getURL("register", "foobar", "app", "123");
    expect(url).toEqual(`${config.api.url}/register/foobar/app/123`);
    url = getURL("hello", "world");
    expect(url).toEqual(`${config.api.url}/hello/world`);
  });
  it("should return the root if no args are specified", () => {
    const url = getURL();
    expect(url).toEqual(`${config.api.url}`);
  })
  }
);