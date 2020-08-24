const { Initial } = require('./initial');

const Seed = function() {
    Initial.call(this);
    this.ID = 'Seed';
};

Seed.prototype = Object.create(Initial.prototype);

Seed.prototype.initial = async function() {
    await this.initialDepartment('Enterprise Platform');
    await this.initialDepartment('Marketplace Acceleration');
    await this.initialDepartment('Business Intelligence');
    await this.initialDepartment('Quality Services');
    await this.initialDepartment('UI/UX Development');
    await this.initialDepartment('Infrastructure Engineering');
    await this.initialDepartment('BackEnd Engineering');

    await this.initialRoles('Divinson Manager','150000','1');
    await this.initialRoles('Product Owner','145000','2');
    await this.initialRoles('Firmware Engineer','135000','3');
    await this.initialRoles('Software Engineer','135000','4');
    await this.initialRoles('Technology Lead','145000','5');
    await this.initialRoles('Scrum Master','155000','6');
    await this.initialRoles('Testing Lead','145000','7');
    await this.initialRoles('Intern','65000','5');

    await this.initialEmployees('Beki', 'Gonzales', 'NULL', '1');
    await this.initialEmployees('Tiana', 'Husted', '1', '5');
    await this.initialEmployees('Mike', 'Kelly', '2', '3');
    await this.initialEmployees('Keith', 'Billings', 'NULL', '1');
    await this.initialEmployees('Joe', 'Mengis', '4', '6');
    await this.initialEmployees('Echo', 'Echo', '5', '7');
    await this.initialEmployees('Kai', 'Cunningham', '5', '8');
    await this.initialEmployees('Brian', 'Soldani', '5', '3');
};

const s = new Seed();
s.initial();