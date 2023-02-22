'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(models.User, { foreignKey: 'userId' });
      Review.belongsTo(models.Spot, { foreignKey: 'spotId' });

      Review.hasMany(models.ReviewImage, { foreignKey: 'reviewId' });
    }
  }
  Review.init({
    spotId: {
      type:DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type:DataTypes.INTEGER,
      allowNull: false
    },
    review: {
      type:DataTypes.STRING,
      allowNull: false
    },
    stars: {
      type:DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
        isInt: true
      }
    }
  }, {
    sequelize,
    modelName: 'Review',
    scopes: {
      imageNoTime() {
        const { ReviewImage } = require('../models');
        return {
          include: {
            model: ReviewImage,
            attributes: { exclude: ['reviewId', "createdAt", "updatedAt"] }
          }
        }
      },
      userPublic() {
        const { User } = require('../models');
        return {
          include: {
            model: User,
            attributes: { exclude: ["hashedPassword",'username', 'email', "createdAt", "updatedAt"] }
          }
        }
      },
      spotReview() {
        const { Spot } = require('../models');
        return {
          include: {
            model: Spot,
            attributes: { exclude: ["description", "createdAt", "updatedAt"] }
          }
        }
      }
    }
  });
  return Review;
};
