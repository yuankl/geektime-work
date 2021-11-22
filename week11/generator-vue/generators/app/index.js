var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);
        this.option('babel');
    }
    async initPackage(){
        let answer = await this.prompt([
            {
                type: "input",
                name: "name",
                message: "Your project name",
                default: this.appname // Default to current folder name
            },
        ]);
        console.log(answer);
        const pkgJson = {
            "name": answer.name,
            "version": "1.0.0",
            "description": "",
            "main": "index.js",
            "scripts": {
                "test": "echo \"Error: no test specified\" && exit 1"
            },
            "author": "",
            "license": "ISC",
            "devDependencies": {

            },
            "dependencies": {
                
            }
        };

        // Extend or create package.json file in destination path
        this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
        this.spawnCommandSync('npm', ['i', 'vue', "webpack", "vue-loader", "css-loader", "copy-webpack-plugin", "vue-template-compiler"]);
        // this.addDevDependencies(["vue",{"save-dev":false}]);
        // this.addDevDependencies(["webpack", "vue-loader", "css-loader", "copy-webpack-plugin", "vue-template-compiler"], { 'save-dev': true });
    }
    copyFiles() {
        this.fs.copyTpl(
            this.templatePath('HelloWorld.vue'),
            this.destinationPath('src/HelloWorld.vue'),
            {}
        );
        this.fs.copyTpl(
            this.templatePath('webpack.config.js'),
            this.destinationPath('webpack.config.js'),
            {}
        );
        this.fs.copyTpl(
            this.templatePath('main.js'),
            this.destinationPath('main.js'),
            {}
        );
        this.fs.copyTpl(
            this.templatePath('index.html'),
            this.destinationPath('sre/index.html'),
            { title: "name" }
        );
    }
    // async method1() {
    //     // const answers = await this.prompt([
    //     //     {
    //     //         type: "input",
    //     //         name: "name",
    //     //         message: "You project name",
    //     //         default: this.appname// default to current folder name
    //     //     },
    //     //     {
    //     //         type: "confirm",
    //     //         name: "cool",
    //     //         message: "Would you like to enable the Cool feature?"
    //     //     }
    //     // ]);
    //     // this.log("app name", answers.name);
    //     // this.log("cool feature",  answers.cool)
    //     this.fs.copyTpl(
    //         this.templatePath('t.html'),
    //         this.destinationPath('public/index.html'),
    //         { title: 'Templating with Yeoman' }
    //     );
    // }
};