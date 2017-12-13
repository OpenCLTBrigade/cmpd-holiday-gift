import * as Sequelize from 'sequelize'

import config from '../config';

function connect(dbConfig) {
    return new Sequelize(
        dbConfig.database,
        dbConfig.user,
        dbConfig.password,
        Object.assign(
          {
            // TODO: move pool settings to config file
            pool: {
              max: 5,
              min: 0,
              idle: 10000
            },
            define: { underscored: true }
          },
          dbConfig
        )
      );
}

export default connect(config)