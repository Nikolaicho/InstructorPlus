import express from "express";
import Corporation from "../models/corporation.model"
import { getCookie } from "../utils/auth.utils";
import Request from "../models/request.model";
import jwt from "jsonwebtoken"
import User from "../models/user.models";


async function getAllCorporations(req:express.Request,res:express.Response){
    res.send(await Corporation.find({}).lean())
}
async function sendRequestToJoin(req:express.Request,res:express.Response){
    const token = getCookie("access",req,res)
    const {id} = jwt.decode(token)
    const organization = req.body.corporationId
    
    let request = new Request({
        organization:organization,
        user:id
    })
    request.save()
}

async function getAllRequests(req:express.Request,res:express.Response) {
    interface formattedRequest{
        requestId:string,
        userId:string,
        firstName:string,
        lastName:string,
    }
    const accessToken = getCookie("access",req,res)
    const decodedToken = jwt.decode(accessToken)
    const result = await User.findById({_id:decodedToken.id})
    let formattedRequest:formattedRequest[]=[];
    let requests;
    if(result.role == "superAdmin"){
        requests = await Request.find({organization:result.organization})
        for (const request of requests) {
            let user = await User.findById({_id:request.user})
            formattedRequest.push({
                requestId:request._id.toString(),
                userId:user._id.toString(),
                firstName:user.firstName,
                lastName:user.lastName,
            })
        }
    }
    res.send(formattedRequest)
}

async function respondToRequest(req:express.Request,res:express.Response) {
    const {isAccepted,userId,requestId} = req.body

    if(isAccepted == false){
        await Request.deleteOne({_id:requestId})
    }
    if(isAccepted == true){
        const request = await Request.findById({_id:requestId})
        const corporation = request.organization
        const user = await User.findById({_id:userId})
        user.organization = corporation
        user.save()
        await Request.deleteOne({_id:requestId})
    }
}
export default {getAllCorporations,sendRequestToJoin,getAllRequests,respondToRequest}