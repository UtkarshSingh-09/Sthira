import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = 'http://localhost:8000';

export const PRESET_PERSONAS = {
  ankit: {
    user_id: 'user_ankit_sde2',
    name: 'Ankit Sharma',
    email: 'ankit.sde@outlook.com',
    phone: '+919876543210',
    pan: 'ABCPS1234F',
    age: 28,
    city_type: 'metro',
    annual_salary: 2400000,
    monthly_expenses: 65000,
    portfolio_value: 1450000,
    monthly_sip: 45000,
    xirr: 15.8,
    panic_threshold: -15,
    wealth_goal: 'FIRE Early Retirement (Age 42)',
    existing_investments: {
      mutual_funds: 950000,
      epf: 320000,
      ppf: 120000,
      stocks: 60000,
      nps: 50000
    },
    kyc_verified: true,
    rbi_compliant: true,
    auth_token: 'sthira_sec_token_ankit_2026'
  },
  priya: {
    user_id: 'user_priya_lead',
    name: 'Priya Sundaram',
    email: 'priya.product@techcorp.in',
    phone: '+919820011223',
    pan: 'BNKPS9876E',
    age: 34,
    city_type: 'metro',
    annual_salary: 4200000,
    monthly_expenses: 120000,
    portfolio_value: 4850000,
    monthly_sip: 110000,
    xirr: 17.2,
    panic_threshold: -20,
    wealth_goal: 'Aggressive Wealth Compounding',
    existing_investments: {
      mutual_funds: 3200000,
      epf: 950000,
      ppf: 450000,
      stocks: 250000,
      nps: 50000
    },
    kyc_verified: true,
    rbi_compliant: true,
    auth_token: 'sthira_sec_token_priya_2026'
  },
  santosh: {
    user_id: 'user_santosh_senior',
    name: 'Santosh Chandrakant Pradhan',
    email: 'santosh.pradhan@gmail.com',
    phone: '+917565960168',
    pan: 'AASPP4321M',
    age: 64,
    city_type: 'tier1',
    annual_salary: 1800000,
    monthly_expenses: 55000,
    portfolio_value: 7850000,
    monthly_sip: 15000,
    xirr: 12.4,
    panic_threshold: -10,
    wealth_goal: 'Capital Preservation & Drawdown Safety',
    existing_investments: {
      mutual_funds: 4500000,
      epf: 0,
      ppf: 1500000,
      stocks: 850000,
      nps: 0
    },
    kyc_verified: true,
    rbi_compliant: true,
    auth_token: 'sthira_sec_token_santosh_2026'
  }
};

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('sthira_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse stored user', e);
      }
    }
    return PRESET_PERSONAS.ankit;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return Boolean(localStorage.getItem('sthira_auth_token'));
  });

  const [activePage, setActivePage] = useState('auth'); // Default to auth page for user review!

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('sthira_user', JSON.stringify(currentUser));
      if (currentUser.auth_token) {
        localStorage.setItem('sthira_auth_token', currentUser.auth_token);
        setIsAuthenticated(true);
      }
    }
  }, [currentUser]);

  const loginUser = (userProfile, token = 'sthira_sec_session_token') => {
    const enriched = {
      ...userProfile,
      auth_token: token,
      last_login: new Date().toISOString()
    };
    setCurrentUser(enriched);
    setIsAuthenticated(true);
    localStorage.setItem('sthira_auth_token', token);
    localStorage.setItem('sthira_user', JSON.stringify(enriched));
  };

  const registerUser = async (registrationData) => {
    const newUserId = `user_${Date.now()}`;
    const token = `sthira_jwt_${Date.now()}`;
    
    const newUser = {
      user_id: newUserId,
      name: registrationData.name,
      email: registrationData.email,
      phone: registrationData.phone,
      pan: registrationData.pan.toUpperCase(),
      age: Number(registrationData.age) || 28,
      city_type: registrationData.city_type || 'metro',
      annual_salary: Number(registrationData.annual_salary) || 1800000,
      monthly_expenses: Number(registrationData.monthly_expenses) || 50000,
      portfolio_value: Number(registrationData.existing_mf || 0) + Number(registrationData.existing_epf || 0) + Number(registrationData.existing_ppf || 0) + Number(registrationData.existing_stocks || 0),
      monthly_sip: Number(registrationData.monthly_sip) || 25000,
      xirr: 13.5,
      panic_threshold: Number(registrationData.panic_threshold) || -15,
      wealth_goal: registrationData.wealth_goal || 'FIRE Early Retirement',
      existing_investments: {
        mutual_funds: Number(registrationData.existing_mf) || 0,
        epf: Number(registrationData.existing_epf) || 0,
        ppf: Number(registrationData.existing_ppf) || 0,
        stocks: Number(registrationData.existing_stocks) || 0,
        nps: Number(registrationData.existing_nps) || 0
      },
      kyc_verified: true,
      rbi_compliant: true,
      auth_token: token,
      registered_at: new Date().toISOString()
    };

    // Sync to backend if accessible
    try {
      await axios.post(`${BACKEND_URL}/api/behavioral/seed`, {
        user_id: newUserId,
        update_type: 'rbi_compliant_onboarding',
        data: {
          panic_threshold: newUser.panic_threshold,
          behavioral_discipline_score: 85,
          kyc_status: 'VERIFIED_UIDAI_PMLA'
        }
      });
    } catch (err) {
      console.warn('Backend sync deferred (will run offline-first):', err.message);
    }

    setCurrentUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('sthira_auth_token', token);
    localStorage.setItem('sthira_user', JSON.stringify(newUser));
    return newUser;
  };

  const logoutUser = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('sthira_auth_token');
    setActivePage('auth');
  };

  const switchPersona = (personaKey) => {
    if (PRESET_PERSONAS[personaKey]) {
      const selected = PRESET_PERSONAS[personaKey];
      setCurrentUser(selected);
      setIsAuthenticated(true);
      localStorage.setItem('sthira_auth_token', selected.auth_token);
      localStorage.setItem('sthira_user', JSON.stringify(selected));
    }
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        isAuthenticated,
        loginUser,
        registerUser,
        logoutUser,
        switchPersona,
        activePage,
        setActivePage,
        backendUrl: BACKEND_URL
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
