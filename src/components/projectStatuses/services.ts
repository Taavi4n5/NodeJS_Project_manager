import {  FieldPacket } from "mysql2";
import pool from "../../database";
import { IProjectStatusSQL } from "./interfaces";

const projectStatusesServices = {
        getAllProjectStatuses: async (): Promise<IProjectStatusSQL[]> => {
            const [projectStatuses]: [IProjectStatusSQL[], FieldPacket[]] = await pool.query('SELECT * FROM projectStatuses WHERE dateDeleted IS NULL;');
            return projectStatuses;
        },
        getProjectStatusById: async (id: number): Promise<IProjectStatusSQL> => {
            const [projectStatus]: [IProjectStatusSQL[], FieldPacket[]] = await pool.query('SELECT * FROM projectStatuses WHERE id = ? AND dateDeleted IS NULL;', [id]);
            return projectStatus[0];
          },
}

export default projectStatusesServices;