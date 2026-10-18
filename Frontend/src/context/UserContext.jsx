import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = 'http://localhost:8000';

const UserContext = createContext(null);

export function UserProvider({ children }) {
  // Read current active session from localStorage
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('sthira_active_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse active user', e);
      }
    }
    return null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return Boolean(localStorage.getItem('sthira_auth_token'));
  });

  const [activePage, setActivePage] = useState(() => {
    const savedToken = localStorage.getItem('sthira_auth_token');
    return savedToken ? 'dashboard' : 'auth';
  });

  // Keep active user synchronized
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('sthira_active_user', JSON.stringify(currentUser));
      if (currentUser.auth_token) {
        localStorage.setItem('sthira_auth_token', currentUser.auth_token);
        setIsAuthenticated(true);
      }
    } else {
      localStorage.removeItem('sthira_active_user');
      localStorage.removeItem('sthira_auth_token');
      setIsAuthenticated(false);
    }
  }, [currentUser]);

  // Real Dynamic Registration
  const registerUser = async (registrationData) => {
    const newUserId = `usr_${Date.now()}`;
    const token = `sthira_jwt_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    
    const newUser = {
      user_id: newUserId,
      name: registrationData.name?.trim() || '',
      email: registrationData.email?.trim().toLowerCase() || '',
      phone: registrationData.phone?.trim() || '',
      pan: registrationData.pan?.trim().toUpperCase() || '',
      password: registrationData.password || 'default_sec_pwd',
      age: Number(registrationData.age) || 28,
      city_type: registrationData.city_type || 'metro',
      annual_salary: Number(registrationData.annual_salary) || 0,
      monthly_expenses: Number(registrationData.monthly_expenses) || 0,
      portfolio_value: (Number(registrationData.existing_mf) || 0) + 
                       (Number(registrationData.existing_epf) || 0) + 
                       (Number(registrationData.existing_ppf) || 0) + 
                       (Number(registrationData.existing_stocks) || 0),
      monthly_sip: Number(registrationData.monthly_sip) || 0,
      xirr: 14.5,
      panic_threshold: Number(registrationData.panic_threshold) || -15,
      wealth_goal: registrationData.wealth_goal || 'FIRE Early Retirement (Age 42)',
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
      created_at: new Date().toISOString()
    };

    // Save in registered users database
    const existingUsers = JSON.parse(localStorage.getItem('sthira_users_db') || '[]');
    const filtered = existingUsers.filter(u => u.email !== newUser.email && u.pan !== newUser.pan);
    filtered.push(newUser);
    localStorage.setItem('sthira_users_db', JSON.stringify(filtered));

    // Sync to backend API
    try {
      await axios.post(`${BACKEND_URL}/api/behavioral/seed`, {
        user_id: newUserId,
        update_type: 'user_onboarding',
        data: {
          panic_threshold: newUser.panic_threshold,
          behavioral_discipline_score: 85,
          kyc_status: 'VERIFIED'
        }
      });
    } catch (err) {
      console.warn('Backend sync deferred (running local-first):', err.message);
    }

    setCurrentUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('sthira_auth_token', token);
    localStorage.setItem('sthira_active_user', JSON.stringify(newUser));
    return newUser;
  };

  // Real Dynamic Login
  const loginUser = async (identifier, password) => {
    const cleanId = identifier?.trim().toLowerCase();
    const existingUsers = JSON.parse(localStorage.getItem('sthira_users_db') || '[]');
    
    // Find matching user by email, PAN, or phone
    const foundUser = existingUsers.find(u => 
      u.email.toLowerCase() === cleanId || 
      u.pan.toLowerCase() === cleanId || 
      u.phone === cleanId
    );

    if (foundUser) {
      const token = `sthira_jwt_${Date.now()}`;
      const active = { ...foundUser, auth_token: token, last_login: new Date().toISOString() };
      setCurrentUser(active);
      setIsAuthenticated(true);
      localStorage.setItem('sthira_auth_token', token);
      localStorage.setItem('sthira_active_user', JSON.stringify(active));
      return { success: true, user: active };
    }

    // Try fetching from backend if user_id was passed
    try {
      const res = await axios.get(`${BACKEND_URL}/api/user/${cleanId}/profile`);
      if (res.data && res.data.user_id) {
        const token = `sthira_jwt_${Date.now()}`;
        const active = {
          user_id: res.data.user_id,
          name: res.data.name,
          email: `${res.data.user_id}@sthira.ai`,
          pan: res.data.pan || 'ABCPS1234F',
          age: res.data.age || 30,
          annual_salary: res.data.annual_salary || 2000000,
          monthly_expenses: res.data.monthly_expenses || 60000,
          portfolio_value: res.data.portfolio_value || 1000000,
          monthly_sip: res.data.monthly_sip || 30000,
          xirr: res.data.xirr || 14.0,
          panic_threshold: -15,
          wealth_goal: 'FIRE Early Retirement',
          existing_investments: { mutual_funds: res.data.portfolio_value || 1000000 },
          auth_token: token
        };
        setCurrentUser(active);
        setIsAuthenticated(true);
        localStorage.setItem('sthira_auth_token', token);
        localStorage.setItem('sthira_active_user', JSON.stringify(active));
        return { success: true, user: active };
      }
    } catch (e) {
      // not in backend
    }

    return { 
      success: false, 
      error: 'No account found matching this Email or PAN. Please Sign Up to create your account.' 
    };
  };

  const logoutUser = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('sthira_auth_token');
    localStorage.removeItem('sthira_active_user');
    setActivePage('auth');
  };

  const updateUserProfile = (updates) => {
    setCurrentUser(prev => {
      const updated = { ...prev, ...updates };
      localStorage.setItem('sthira_active_user', JSON.stringify(updated));
      // Also update in db
      const existingUsers = JSON.parse(localStorage.getItem('sthira_users_db') || '[]');
      const newDb = existingUsers.map(u => u.user_id === updated.user_id ? updated : u);
      localStorage.setItem('sthira_users_db', JSON.stringify(newDb));
      return updated;
    });
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
        updateUserProfile,
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
