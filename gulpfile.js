/**
 * © Rolling Array https://rollingarray.co.in/
 *
 * long description for the file
 *
 * @summary Version update gulp task
 * @author code@rollingarray.co.in
 *
 * Created at     : 2021-11-04 18:30:25 
 * Last modified  : 2021-11-05 10:00:51
 */


const gulp = require("gulp");
const argv = require("minimist")(process.argv.slice(2));
const path = require("path");
const replace = require("gulp-replace");

gulp.task("version-update", function () {
    const ng_env = argv["configuration"];
    const appEnvironmentsPath = path.resolve(__dirname, `./src/environments`);
    const appEnvironmentFilePath = ng_env ? path.join(appEnvironmentsPath, `environment.${ng_env}.ts`) : path.join(appEnvironmentsPath, `environment.ts`);
    return gulp
        .src([appEnvironmentFilePath])
        .pipe(
            replace(/version:\s?"\d+.\d+.\d+.\d+",?/g, function (match) {
                const matches = /(version:\s?")(\d+.\d+.\d+.\d+)(",?)/g.exec(
                    match
                );
				const appCurrentVersion = matches[2];
				const versionParts = appCurrentVersion.split(".").map((v) => +v);

				versionParts[3]++
				versionParts[3] > 200 ? versionParts[2]++ : versionParts[2];
				versionParts[2] > 100 ? versionParts[1]++ : versionParts[1];
				versionParts[1] > 50 ? versionParts[0]++ : versionParts[0];
				
				const newAppVersion = versionParts.join(".");
				const replaced_appCurrentVersion = match.replace(
                    appCurrentVersion,
                    newAppVersion
				);
				
                console.log(
                    `${this.file.path} New version to be written: ${replaced_appCurrentVersion}`
                );
                return replaced_appCurrentVersion;
            })
        )
        .pipe(gulp.dest(appEnvironmentsPath));
});
