import { attribute, createScript, ScriptTypeBase } from "../../utils/scriptDecorators";


@createScript("openButton")
class OpenButton extends ScriptTypeBase {
    @attribute({
        type: "string",
        default: "https://playcanvas.com/project/1032835/overview/typescript-template",
    })
    public link = "https://playcanvas.com/project/1032835/overview/typescript-template";

    public initialize() {
        console.log(222222, this.entity.button)
        this.entity.button?.on("click", () => {
            console.log(333333, this.entity.button)
            window.open(this.link);
        });
    }
}
