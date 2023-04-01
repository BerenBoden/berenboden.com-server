import { Request, Response } from "express";

export const getResource = async (req: Request, res: Response) => {
  try {
    res.send("Hello World");
  } catch (err) {}
};
export const postResource = async (req: Request, res: Response) => {
  try {
    // Do something here
  } catch (err) {}
};

export const deleteResource = async (req: Request, res: Response) => {
  try {
    // Do something here
  } catch (err) {}
};

export const updateResource = async (req: Request, res: Response) => {
  try {
    // Do something here
  } catch (err) {}
};
