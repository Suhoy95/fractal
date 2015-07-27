
describe("the customization bar", function(){

    var customizationBar

    beforeEach(function(){
        browser.get("app/index.html");

        customizationButton = element.all(by.css(".customization-button"));
        customizationBar = element.all(by.css(".customization-bar"));
    });

    it("should be one customization-bar", function(){    
        expect(customizationBar.count()).toBe(1);
    });

    it("should be displayed after click on button", function(){
        customizationButton.click();

        expect( customizationBar.isDisplayed() ).toBeTruthy();
    });

});