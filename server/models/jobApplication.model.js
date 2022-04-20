// @Author: Vishwanath Suresh
module.exports = (sequelize, DataTypes) => {
    const JobApplications = sequelize.define("jobApplications", {
        application_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        job_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        first_name: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING(45),
            allowNull: true
        },
        dob: {
            type: "DATE",
            allowNull: true
        },
        phone_no: {
            type: DataTypes.STRING(45),
            allowNull: true
        },
        email: {
            type: "EMAIL",
            allowNull: false
        },
        address: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        resume: {
            type:DataTypes.STRING(45),
            allowNull: false
        },
        status: {
            type: DataTypes.STRING(45),
            default: "applied"
        }
    }, {
        tableName: "job_applications",
        createdAt: "created_at",
        updatedAt: "updated_at"
    })
    return JobApplications
}