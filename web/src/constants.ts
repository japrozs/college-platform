import { PiMoney } from "react-icons/pi";
import { ResourceType } from "./types";
import { LuPlaneLanding, LuSchool } from "react-icons/lu";
import { BiHealth } from "react-icons/bi";

export const RESOURCES: ResourceType[] = [
    {
        name: "College Applications",
        description:
            "A go-to guide with everything you need for applying to college—helpful tips, resources, and advice to make the process a breeze!",
        slug: "college-applications",
        icon: LuSchool,
        color: "text-pink-500",
        links: [
            {
                title: "Undocumented students applying to college",
                url: "https://www.collegeessayguy.com/blog/undocumented-students-college",
            },
        ],
    },
    {
        name: "Financial Aid",
        description:
            "List of resources intended to help you navigate the complex world of financial aids and scholarships, an important tool in your college journey.",
        slug: "financial-aid",
        icon: PiMoney,
        color: "text-green-500",
        links: [
            {
                title: "The College Board - Financial Aid 101",
                url: "https://bigfuture.collegeboard.org/pay-for-college",
            },
            {
                title: "Federal Student Aid",
                url: "https://studentaid.gov/",
            },
            {
                title: "Nerdwallet's Financial Aid Guide",
                url: "https://www.nerdwallet.com/article/loans/student-loans/financial-aid",
            },
            {
                title: "U.S. News & World Report – Paying for College",
                url: "https://www.usnews.com/education/best-colleges/paying-for-college",
            },
            {
                title: "FastWeb – Financial Aid and Scholarships",
                url: "https://www.fastweb.com/financial-aid",
            },
            {
                title: "CollegeBoard – CSS Profile",
                url: "https://cssprofile.collegeboard.org/",
            },
            {
                title: "Federal Student Aid Report",
                url: "https://studentaid.gov/apply-for-aid/fafsa/review-and-correct/sar-student-aid-report",
            },
            {
                title: "Step by Step Guide to the Federal Financial Aid Process",
                url: "https://custom.cvent.com/555772F3779845EA8754254BEAE0FD0C/files/378ced57def746a282af1ff911815686.pdf",
            },
            {
                title: "Student Aid Reference Desk",
                url: "https://www.studentaidrefdesk.org/",
            },
            {
                title: "IFAP Knowledge Center",
                url: "https://fsapartners.ed.gov/home/",
            },
            {
                title: "What is the FAFSA? And Why should you care?",
                url: "https://www.fastweb.com/financial-aid/articles/what-s-the-fafsa-and-why-you-should-care",
            },
            {
                title: "Compare Private Student Loans",
                url: "https://www.edvisors.com/compare-lenders/",
            },
            {
                title: "Consumer Finance – Paying for college",
                url: "https://www.consumerfinance.gov/paying-for-college/",
            },
            {
                title: "Strategies to lower Student loan payments ",
                url: "https://thecollegeinvestor.com/student-loan-debt/",
            },
            {
                title: "Eight Financial Aid Secrets That Parents And Students Need To Know",
                url: "https://www.forbes.com/sites/robertfarrington/2014/04/10/eight-financial-aid-secrets-that-parents-and-students-need-to-know/?sh=2d4b1fb36bc6",
            },
        ],
    },
    {
        name: "International Student Resources",
        description:
            "A guide for international students, offering resources to navigate U.S. college applications, visas, and successful integration into campus life.",
        slug: "international-student",
        icon: LuPlaneLanding,
        color: "text-purple-500",
        links: [],
    },
    {
        name: "Mental Health Resources",
        description:
            "A resource catalog promoting mental well-being for college applicants, providing tools and support for a healthy and balanced application journey.",
        slug: "mental-health",
        icon: BiHealth,
        color: "text-red-500",
        links: [],
    },
];

export const COLLEGE_APPLICATION_RESOURCES = RESOURCES[0];
export const FINANCIAL_AID_RESOURCES = RESOURCES[1];
export const INTERNATIONAL_STUDENT_RESOURCES = RESOURCES[2];
export const MENTAL_HEALTH_RESOURCES = RESOURCES[3];
