import React from "react";
import styled from "styled-components";
import parse from "html-react-parser";

const SecurityOverViewStyles = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 50px;
  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const SecurityPoint = styled.div`
  width: 48%;
  border: 2px solid #e0e0e0;
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
  @media (max-width: 900px) {
    width: 100%;
  }
  .security_point {
    margin-bottom: 10px;
    line-height: 1.6;
    color: #6e6c6b;
    font-size: 1.4rem;
  }
  .status_point {
    font-size: 1rem;
  }
  h3 {
    text-align: left;
    font-size: 2.1rem;
    font-weight: 600;
    line-height: 1.2;
    margin: 0;
    margin-bottom: 15px;
  }
  p {
    text-align: left;
    font-weight: 400;
    margin-bottom: 10px;
  }
`;

const SecurityOverView = () => {
  const securitydata = [
    {
      header: "Data Encryption",
      points: [
        {
          text: "<b>Database Encryption.</b> All databases are encrypted at rest with AES-256, block-level storage encryption. For sensitive fields, we implement application-level encryption.",
          status: 2,
        },
        {
          text: "<b>Data transmission encrypted.</b> The company uses secure data transmission protocols to encrypt confidential and sensitive data when transmitted over public networks.",
          status: 2,
        },
      ],
    },
    {
      header: "Secure Authentication and Access Control",
      points: [
        {
          text: "<b>Remote access security enforced.</b> We require employees and some users to verify their identity using MFA before accessing systems.",
          status: 2,
        },
        {
          text: "<b>Role-based access control system</b> restricts data access to authorized personnel only.",
          status: 2,
        },
      ],
    },
    {
      header: "Privacy Protection",
      points: [
        {
          text: "<b>Data Protection.</b> We clearly define in your Privacy Policy how user data is used, stored, and protected. We collect only the data absolutely necessary for platform functionality.",
          status: 2,
        },
        {
          text: "<b>Compliance with Data Protection Laws.</b> We comply with relevant data protection laws, including GDPR and similar regulations.",
          status: 2,
        },
      ],
    },
    {
      header: "Regular Security Audits",
      points: [
        {
          text: "<b>Frequent Security Audits and Vulnerability Assessments</b>. We conduct routine internal reviews of your security measures, including software updates and access controls.",
          status: 2,
        },
      ],
    },
    // {
    //   header: "Continuous Monitoring and Incident Response",
    //   points: [
    //     {
    //       text: "Platform is continuously monitored for unusual activity.",
    //       status: 2,
    //     },
    //     {
    //       text: "Rapid response team in place to address any potential security breaches.",
    //       status: 2,
    //     },
    //   ],
    // },
    {
      header: "Data Backup and Disaster Recovery",
      points: [
        {
          text: "<b>Automated Backup Schedule.</b> We implement tools to automate data backups on a regular basis. Backups are encrypted (AES-256) to protect data during storage.",
          status: 2,
        },
        {
          text: "<b>Disaster Recovery Plan (DRP).</b> We've developped a documented plan for responding to disasters, including roles, recovery procedures, and priorities.",
          status: 2,
        },
      ],
    },
    {
      header: "User Control and Transparency",
      points: [
        {
          text: "<b>Account Management</b>. Users can manage their data, including requesting or deleting their account information.",
          status: 2,
        },
        {
          text: "<b>Data Access Tools</b>. We aim to provide users with dashboards to view and manage their data.",
          status: 1,
        },
        {
          text: "<b>Public Documentation.</b> We maintain up-to-date Privacy Policy and Terms of Service explaining data handling practices.",
          status: 2,
        },
      ],
    },
    {
      header: "Compliance with Industry Standards",
      points: [
        {
          text: "<b>Gap Analysis.</b> We are conducting an initial assessment to identify gaps in meeting these standards.",
          status: 1,
        },
        {
          text: "<b>Implementation Roadmap.</b> Follow a structured plan to achieve compliance, including implementing required controls.",
          status: 0,
        },
        {
          text: "<b>Third-Party Certification.</b> Work with certified auditors to validate compliance with ISO 27001.",
          status: 0,
        },
      ],
    },
    // {
    //   header: "Education and Best Practices",
    //   points: [
    //     {
    //       text: "Provides resources to promote safe online behavior, like creating strong passwords.",
    //       status: 1,
    //     },
    //     {
    //       text: "Educates users on recognizing phishing attempts and other security threats.",
    //       status: 2,
    //     },
    //   ],
    // },
    {
      header: "Commitment to Ongoing Improvement",
      points: [
        {
          text: "<b>Threat Intelligence.</b> BeSavvy constantly evolves security practices in response to emerging threats.",
          status: 2,
        },
        {
          text: "<b>Continuous Updates.</b> BeSavvy updates security measures based on new innovations in the field.",
          status: 2,
        },
      ],
    },
    {
      header: "Clear Privacy Policy and Terms",
      points: [
        {
          text: "<b>Privacy Policy.</b> Clearly outline data collection, usage, and sharing policies.",
          status: 2,
        },
        {
          text: "<b>Terms of Service.</b> Define user responsibilities and platform commitments, ensuring both parties understand their obligations.",
          status: 2,
        },
      ],
    },
  ];

  return (
    <SecurityOverViewStyles>
      {securitydata.map((item, index) => {
        return (
          <SecurityPoint key={index}>
            <h3>{item.header}</h3>
            <div>
              {item.points.map((point) => {
                let color;
                if (point.status === 0) {
                  color = "🔴";
                } else if (point.status === 1) {
                  color = "🟡";
                } else {
                  color = "🟢";
                }
                return parse(
                  `<div className="security_point">
                 <span className="status_point">${color}</span> ${point.text}</div>`
                );
              })}
            </div>
          </SecurityPoint>
        );
      })}
    </SecurityOverViewStyles>
  );
};

export default SecurityOverView;
