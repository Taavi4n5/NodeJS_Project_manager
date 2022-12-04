import { FieldPacket, ResultSetHeader } from 'mysql2';
import pool from '../../database';
import { IProject, IProjectSQL } from './interfaces';

const projectsServices = {
    getAllProjects: async (): Promise<IProjectSQL[]> => {
        const [projects]: [IProjectSQL[], FieldPacket[]] = await pool.query(`SELECT projects.id, projects.title, projects.content, projects.dateCreated, users.id AS userId, users.firstName, users.lastName FROM projects INNER JOIN users ON projects.userId = users.id WHERE projects.dateDeleted IS NULL;`);
        return projects;
    },
    findProjectById: async (id: number): Promise<IProjectSQL> => {
        const [projects]: [IProjectSQL[], FieldPacket[]] = await pool.query(`SELECT projects.id, projects.title, projects.content, projects.createdDate, users.id AS userId, users.firstName, users.lastName FROM projects INNER JOIN users ON projects.userId = users.id WHERE projects.id = ? AND projects.dateDeleted IS NULL;`, [id]);
        return projects[0];
    },
    createProject: async (project: IProject): Promise<number> => {
        const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query('INSERT INTO projects SET ?;', [project]);
        return result.insertId;
    },
    updateProject: async (projectToUpdate: IProject) => {
        const {
          id, title, content, statusId,
        } = projectToUpdate;
        const project = await projectsServices.findProjectById(id!);
    
        const update = {
          title: title || project.title,
          content: content|| project.content,
          statusId: statusId || project.statusId,
        };
        
        const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query('UPDATE projects SET ? WHERE id = ?;', [update, id]);
        if (result.affectedRows < 1) {
          return false;
        }
        return true;
    },
    deleteProject: async (id: number): Promise<Boolean> => {
        const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query('UPDATE projects SET dateDeleted = ? WHERE id = ?;', [Date.now(), id]);
        if (result.affectedRows < 1) {
          return false;
        }
        return true;
      },

}

export default projectsServices;